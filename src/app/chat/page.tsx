"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, X, Plus, MessageCircle, Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/auth-context";
import { useLevel } from "@/contexts/level-context";
import { apiChat } from "@/lib/api";
import { MarkdownMessage } from "@/components/chat/markdown-message";
import {
  saveChatSession,
  getChatSessions,
  getChatSession,
  deleteChatSession,
  ChatSession,
  ChatMessage,
} from "@/lib/firestore";

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm your CFA study assistant. I can help with questions about any curriculum topic, explain concepts, suggest study strategies, or discuss your progress.",
  timestamp: new Date().toISOString(),
};

export default function ChatPage() {
  const { user } = useAuth();
  const { level } = useLevel();
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const didAutoLoadSession = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!user) {
      didAutoLoadSession.current = false;
      setSessions([]);
      setCurrentSessionId(null);
      setMessages([WELCOME_MESSAGE]);
      return;
    }

    getChatSessions(user.uid, 50)
      .then((loadedSessions) => {
        setSessions(loadedSessions);
        if (!didAutoLoadSession.current && loadedSessions[0]) {
          didAutoLoadSession.current = true;
          setCurrentSessionId(loadedSessions[0].id || null);
          setMessages(loadedSessions[0].messages);
        }
      })
      .catch(console.error);
  }, [user]);

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

    const updated = await getChatSessions(user.uid, 50);
    setSessions(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      role: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    const query = input.trim();
    setInput("");
    setIsTyping(true);

    try {
      const history = newMessages
        .filter(m => m !== WELCOME_MESSAGE)
        .map(m => ({ role: m.role, content: m.content }));

      const { response } = await apiChat({
        message: query,
        history: history.slice(-20),
        level,
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
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Sorry, an error occurred while processing your message. Please try again.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
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
  };

  const handleLoadSession = async (sessionId: string) => {
    if (!user) return;
    const session = await getChatSession(user.uid, sessionId);
    if (session) {
      setMessages(session.messages);
      setCurrentSessionId(sessionId);
    }
  };

  const handleDeleteSession = async (sessionId: string) => {
    if (!user) return;
    await deleteChatSession(user.uid, sessionId);
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    if (currentSessionId === sessionId) {
      handleNewChat();
    }
  };

  return (
    <div className="mx-auto flex h-full w-full max-w-7xl">
      {/* Sessions sidebar */}
      {showSidebar && (
        <div className="w-52 shrink-0 overflow-y-auto border-r border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Chats</span>
            <button onClick={() => setShowSidebar(false)} className="rounded p-1 hover:bg-accent">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="p-2">
            <button
              onClick={handleNewChat}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium text-primary hover:bg-primary/10"
            >
              <Plus className="h-4 w-4" /> New conversation
            </button>
          </div>
          <div className="flex flex-col gap-1 p-2">
            {sessions.map((s) => (
              <div key={s.id} className="group flex items-center gap-1">
                <button
                  onClick={() => handleLoadSession(s.id!)}
                  className={cn(
                    "flex-1 truncate rounded-lg px-2 py-2 text-left text-xs transition-colors",
                    currentSessionId === s.id ? "bg-primary/10 text-primary font-medium" : "hover:bg-accent"
                  )}
                >
                  <span className="block truncate">{s.title}</span>
                  <span className="mt-0.5 block text-[10px] font-normal text-muted-foreground">
                    {new Date(s.updatedAt).toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                  </span>
                </button>
                <button
                  onClick={() => handleDeleteSession(s.id!)}
                  className="hidden rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive group-hover:block"
                >
                  <Trash2 className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main chat */}
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto pb-4">
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

          <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-2 sm:px-6">
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
                      : "w-full max-w-4xl rounded-tl-md border border-border bg-card"
                  )}
                >
                  {msg.content && (
                    msg.role === "assistant" ? (
                      <MarkdownMessage content={msg.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )
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
          <form onSubmit={handleSubmit} className="relative mx-auto flex max-w-5xl items-end gap-2">
            <button
              type="button"
              onClick={() => setShowSidebar(!showSidebar)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-input bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="History"
              title="View previous conversations"
            >
              <MessageCircle className="h-5 w-5" />
            </button>

            <div className="relative flex-1">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about CFA..."
                rows={1}
                className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 pr-14 text-sm outline-none ring-ring transition-shadow placeholder:text-muted-foreground focus:ring-2"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
                aria-label="Send"
              >
                {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-[10px] text-muted-foreground">
            AI-generated answers — may contain inaccuracies.
          </p>
        </div>
      </div>
    </div>
  );
}
