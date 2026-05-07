"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, Plus, Loader2, Mic, X, Copy, RotateCcw, Check } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useLevel } from "@/contexts/level-context";
import { apiChat } from "@/lib/api";
import { MarkdownMessage } from "@/components/chat/markdown-message";
import {
  saveChatSession,
  getChatSessions,
  getChatSession,
  incrementChatUsage,
  ChatAttachment,
  ChatSession,
  ChatMessage,
} from "@/lib/firestore";
import { useSubscription } from "@/hooks/use-subscription";
import { UpgradeWall, UsageCounter } from "@/components/layout/upgrade-wall";
import { FREE_LIMITS } from "@/lib/usage-limits";

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content: "Ask me anything about the CFA curriculum — concepts, formulas, practice strategies, or any topic you're studying.",
  timestamp: new Date().toISOString(),
};

type BrowserSpeechRecognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: { resultIndex: number; results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type BrowserWindowWithSpeech = Window & {
  SpeechRecognition?: new () => BrowserSpeechRecognition;
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
};

async function resizeImage(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image"));
    reader.readAsDataURL(file);
  });

  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = dataUrl;
  });

  const maxSide = 1200;
  const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return dataUrl;
  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toDataURL("image/jpeg", 0.78);
}

async function readTextFile(file: File): Promise<string> {
  const text = await file.text();
  return text.length > 12000 ? `${text.slice(0, 12000)}\n\n[File truncated for length]` : text;
}

export default function ChatPage() {
  const { user, refreshProfile } = useAuth();
  const { level } = useLevel();
  const { canChat, remainingChat, isSubscribed: isSub } = useSubscription();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [attachmentError, setAttachmentError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const didAutoLoadSession = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  const listeningRef = useRef(false);
  const stopRequestedRef = useRef(false);
  const voiceBaseInputRef = useRef("");
  const voiceFinalTranscriptRef = useRef("");

  const sessionParam = searchParams.get("session");
  const newChatParam = searchParams.get("new");

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    const textarea = inputRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 280)}px`;
  }, [input]);

  useEffect(() => {
    if (!user) {
      didAutoLoadSession.current = false;
      setCurrentSessionId(null);
      setMessages([WELCOME_MESSAGE]);
      return;
    }

    if (newChatParam) {
      didAutoLoadSession.current = true;
      setCurrentSessionId(null);
      setMessages([WELCOME_MESSAGE]);
      return;
    }

    if (sessionParam) {
      didAutoLoadSession.current = true;
      getChatSession(user.uid, sessionParam)
        .then((session) => {
          if (session) {
            setCurrentSessionId(sessionParam);
            setMessages(session.messages);
          }
        })
        .catch(console.error);
      return;
    }

    getChatSessions(user.uid, 50)
      .then((loadedSessions) => {
        if (!didAutoLoadSession.current && loadedSessions[0]) {
          didAutoLoadSession.current = true;
          setCurrentSessionId(loadedSessions[0].id || null);
          setMessages(loadedSessions[0].messages);
        }
      })
      .catch(console.error);
  }, [user, sessionParam, newChatParam]);

  const saveCurrentSession = async (msgs: ChatMessage[]) => {
    if (!user || msgs.length <= 1) return;
    const firstUserMsg = msgs.find(m => m.role === "user");
    const title = firstUserMsg?.content.slice(0, 50) || "New conversation";

    const session: ChatSession = {
      id: currentSessionId || undefined,
      title,
      level,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: msgs,
    };

    const id = await saveChatSession(user.uid, session);
    setCurrentSessionId(id);
    window.dispatchEvent(new Event("tradingcore:chat-sessions-updated"));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!input.trim() && attachments.length === 0) || isTyping) return;
    if (!canChat) return;

    if (!isSub && user) {
      await incrementChatUsage(user.uid);
      await refreshProfile();
    }

    const query = input.trim() || "Please analyze the attached image for CFA-relevant content.";

    const userMessage: ChatMessage = {
      role: "user",
      content: query,
      timestamp: new Date().toISOString(),
      attachments: attachments.length > 0 ? attachments : undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setAttachments([]);
    setAttachmentError("");
    setIsTyping(true);

    try {
      const history = newMessages
        .filter(m => m !== WELCOME_MESSAGE)
        .map(m => ({ role: m.role, content: m.content }));

      const { response } = await apiChat({
        message: query,
        history: history.slice(-20),
        level,
        attachments,
      });

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };

      const finalMessages = [...newMessages, assistantMessage];
      setMessages(finalMessages);
      await saveCurrentSession(finalMessages);
    } catch (err) {
      console.error("Chat error:", err);
      const errMsg = err instanceof Error ? err.message : "Unknown error";
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: `Something went wrong: ${errMsg}. Please try again.`,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopyMessage = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedMessageIndex(index);
    window.setTimeout(() => setCopiedMessageIndex(null), 1400);
  };

  const handleRegenerate = async (assistantIndex: number) => {
    if (!user || isTyping) return;
    const priorMessages = messages.slice(0, assistantIndex);
    const lastUserIndex = [...priorMessages].map((message) => message.role).lastIndexOf("user");
    if (lastUserIndex < 0) return;

    const lastUserMessage = priorMessages[lastUserIndex];
    const retryHistory = priorMessages
      .slice(0, lastUserIndex)
      .filter((message) => message !== WELCOME_MESSAGE)
      .map((message) => ({ role: message.role, content: message.content }));

    const nextMessages = priorMessages;
    setMessages(nextMessages);
    setIsTyping(true);

    try {
      const { response } = await apiChat({
        message: lastUserMessage.content,
        history: retryHistory.slice(-20),
        level,
        attachments: lastUserMessage.attachments,
      });
      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };
      const finalMessages = [...nextMessages, assistantMessage];
      setMessages(finalMessages);
      await saveCurrentSession(finalMessages);
    } catch {
      setMessages(messages);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleNewChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setCurrentSessionId(null);
    setAttachments([]);
    setAttachmentError("");
    setVoiceError("");
  };

  const handleAttachFile = async (file: File | undefined) => {
    if (!file) return;
    setAttachmentError("");
    if (file.size > 8 * 1024 * 1024) {
      setAttachmentError("File is too large. Please use a file under 8MB.");
      return;
    }
    try {
      if (file.type.startsWith("image/")) {
        const dataUrl = await resizeImage(file);
        setAttachments([
          {
            type: "image",
            name: file.name,
            mimeType: "image/jpeg",
            dataUrl,
          },
        ]);
        return;
      }

      const isTextLike =
        file.type.startsWith("text/") ||
        /\.(txt|md|csv|json|xml|html|css|js|ts|tsx|py|sql)$/i.test(file.name);

      if (!isTextLike) {
        setAttachmentError("This file type is not supported yet. Use an image or text-based file.");
        return;
      }

      const textContent = await readTextFile(file);
      setAttachments([
        {
          type: "file",
          name: file.name,
          mimeType: file.type || "text/plain",
          textContent,
        },
      ]);
    } catch {
      setAttachmentError("Could not process this file. Please try another one.");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.types.includes("Files")) {
      setDragActive(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setDragActive(false);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    handleAttachFile(event.dataTransfer.files?.[0]);
  };

  const handleToggleVoice = () => {
    setVoiceError("");
    const SpeechRecognitionCtor =
      (window as BrowserWindowWithSpeech).SpeechRecognition ||
      (window as BrowserWindowWithSpeech).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) {
      setVoiceError("Voice dictation is not supported in this browser.");
      return;
    }

    if (isListening) {
      stopRequestedRef.current = true;
      listeningRef.current = false;
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event) => {
      let interim = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0]?.transcript || "";
        if (event.results[i].isFinal) {
          voiceFinalTranscriptRef.current = [voiceFinalTranscriptRef.current, transcript]
            .filter(Boolean)
            .join(" ")
            .trim();
        } else {
          interim += transcript;
        }
      }
      setInput(
        [voiceBaseInputRef.current, voiceFinalTranscriptRef.current, interim]
          .filter(Boolean)
          .join(" ")
          .trim()
      );
    };
    recognition.onerror = () => {
      setVoiceError("Could not capture audio. Please try again.");
      setIsListening(false);
      listeningRef.current = false;
    };
    recognition.onend = () => {
      if (listeningRef.current && !stopRequestedRef.current) {
        try {
          recognition.start();
        } catch {
          setIsListening(false);
          listeningRef.current = false;
        }
        return;
      }
      setIsListening(false);
      listeningRef.current = false;
    };
    recognitionRef.current = recognition;
    voiceBaseInputRef.current = input.trim();
    voiceFinalTranscriptRef.current = "";
    stopRequestedRef.current = false;
    listeningRef.current = true;
    setIsListening(true);
    recognition.start();
  };

  return (
    <div
      className="relative flex h-full w-full"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragActive && (
        <div className="pointer-events-none absolute inset-4 z-50 flex items-center justify-center rounded-3xl border-2 border-dashed border-primary bg-background/80 backdrop-blur-sm">
          <div className="rounded-2xl border border-primary/30 bg-card px-6 py-4 text-center">
            <p className="text-sm font-semibold text-primary">Drop file to attach</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Images and text-based files can be added to your next CFA chat message.
            </p>
          </div>
        </div>
      )}
      {/* Main chat */}
      <div className="flex flex-1 flex-col">
        <div className="chat-scroll flex-1 overflow-y-auto pb-4">
          {messages.length <= 1 && (
            <div className="flex flex-col items-center gap-4 pt-12 pb-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold">Chat CFA</h1>
              <p className="max-w-md text-center text-sm text-muted-foreground">
                Ask about any CFA Level {level} topic.
                AI-generated answers.
              </p>
            </div>
          )}

                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-2 sm:px-8">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    msg.role === "assistant"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {msg.role === "assistant" ? (
                    <Sparkles className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-bold">Me</span>
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "max-w-[78%] rounded-tr-md bg-primary text-primary-foreground"
                      : "w-full max-w-5xl rounded-tl-md border border-border bg-card"
                  )}
                >
                  {msg.attachments?.map((attachment, attachmentIndex) => (
                    <div key={`${attachment.name}-${attachmentIndex}`} className="mb-3">
                      {attachment.type === "image" && attachment.dataUrl ? (
                        <img
                          src={attachment.dataUrl}
                          alt={attachment.name}
                          className="max-h-64 rounded-xl border border-border object-contain"
                        />
                      ) : (
                        <div className="rounded-xl border border-border bg-muted/50 px-3 py-2 text-xs">
                          Attached file: {attachment.name}
                        </div>
                      )}
                    </div>
                  ))}
                  {msg.content && (
                    msg.role === "assistant" ? (
                      <MarkdownMessage content={msg.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )
                  )}
                  {msg.role === "assistant" && msg.content && (
                    <div className="mt-3 flex items-center gap-1 text-muted-foreground">
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(msg.content, idx)}
                        className="rounded-md p-1.5 transition-colors hover:bg-accent hover:text-foreground"
                        title="Copy"
                        aria-label="Copy response"
                      >
                        {copiedMessageIndex === idx ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRegenerate(idx)}
                        disabled={isTyping}
                        className="rounded-md p-1.5 transition-colors hover:bg-accent hover:text-foreground disabled:opacity-40"
                        title="Regenerate"
                        aria-label="Regenerate response"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-2xl rounded-tl-md border border-border bg-card px-4 py-3">
                  <div className="flex gap-1">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/40 [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="sticky bottom-0 border-t border-border bg-background px-2 py-4 sm:px-4">
          <form onSubmit={handleSubmit} className="relative mx-auto flex max-w-6xl items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.txt,.md,.csv,.json,.xml,.html,.css,.js,.ts,.tsx,.py,.sql"
              className="hidden"
              onChange={(e) => handleAttachFile(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
            className="flex h-11 w-11 shrink-0 items-center justify-center self-end rounded-xl border border-input bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Attach file"
              title="Attach file or image"
            >
              <Plus className="h-5 w-5" />
            </button>

            <div className="flex flex-1 flex-col">
              {attachments.length > 0 && (
                <div className="mb-2 flex items-center gap-2 rounded-xl border border-border bg-card p-2">
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-border bg-muted">
                    {attachments[0].type === "image" && attachments[0].dataUrl ? (
                      <img src={attachments[0].dataUrl} alt={attachments[0].name} className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-[10px] font-semibold text-muted-foreground">FILE</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{attachments[0].name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {attachments[0].type === "image" ? "Image ready to send" : "File ready to send"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachments([])}
                    className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-foreground"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
              <div className="flex min-h-11 items-end rounded-xl border border-input bg-card pr-1.5 transition-shadow focus-within:ring-2 focus-within:ring-ring">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={isListening ? "Listening in English..." : "Ask about CFA..."}
                  rows={1}
                  className="chat-scroll min-h-11 max-h-[280px] flex-1 resize-none overflow-y-auto bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
                />
                <div className="flex shrink-0 items-center gap-1 pb-1.5">
                  <button
                    type="button"
                    onClick={handleToggleVoice}
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                      isListening ? "bg-primary/20 text-primary" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                    )}
                    aria-label={isListening ? "Stop dictation" : "Start voice dictation"}
                    title="Dictate in English"
                  >
                    <Mic className="h-4 w-4" />
                  </button>
                  <button
                    type="submit"
                    disabled={(!input.trim() && attachments.length === 0) || isTyping}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
                    aria-label="Send"
                  >
                    {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </form>
          {(attachmentError || voiceError) && (
            <p className="mt-2 text-center text-[11px] text-destructive">
              {attachmentError || voiceError}
            </p>
          )}
          {!canChat ? (
            <div className="mt-4">
              <UpgradeWall
                title="Daily message limit reached"
                description="Subscribe for unlimited AI conversations and get all your CFA questions answered."
                usedCount={FREE_LIMITS.chatMessages}
                limitCount={FREE_LIMITS.chatMessages}
                unit="messages"
              />
            </div>
          ) : (
            <>
              <div className="mt-2 flex items-center justify-center gap-2">
                <p className="text-[10px] text-muted-foreground">
                  AI-generated answers — may contain inaccuracies.
                </p>
                <UsageCounter remaining={remainingChat} total={FREE_LIMITS.chatMessages} unit="msgs" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
