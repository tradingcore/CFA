"use client";

import { useState, useRef, useEffect } from "react";
import type { GeneratedQuestion } from "@/lib/api";
import { apiChat } from "@/lib/api";
import { useLevel } from "@/contexts/level-context";
import { MarkdownMessage } from "@/components/chat/markdown-message";
import { X, Send, Sparkles, MessageCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuizChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface QuizChatProps {
  question: GeneratedQuestion;
  selectedIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
  messages: QuizChatMessage[];
  onMessagesChange: (messages: QuizChatMessage[]) => void;
  isFreeUser?: boolean;
  maxFreeMessages?: number;
}

export function QuizChat({
  question,
  selectedIndex,
  isOpen,
  onClose,
  messages,
  onMessagesChange,
  isFreeUser = false,
  maxFreeMessages = 2,
}: QuizChatProps) {
  const { level } = useLevel();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const limitReached = isFreeUser && userMessageCount >= maxFreeMessages;
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading || limitReached) return;
    const userMessage: QuizChatMessage = { role: "user", content: input.trim() };
    const nextMessages = [...messages, userMessage];
    onMessagesChange(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const optionLines = question.options
        .map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`)
        .join("\n");
      const selectedContext = selectedIndex != null
        ? `The student selected ${String.fromCharCode(65 + selectedIndex)}. The correct answer is ${String.fromCharCode(65 + question.correctIndex)}.`
        : `The student has not selected an answer yet. Do not reveal the correct answer unless explicitly asked.`;
      const history = nextMessages.map((message) => ({ role: message.role, content: message.content }));
      const { response } = await apiChat({
        message: userMessage.content,
        history,
        level,
        topicContext: `Current CFA practice question:\n${question.question}\n\nOptions:\n${optionLines}\n\n${selectedContext}`,
      });
      onMessagesChange([...nextMessages, { role: "assistant", content: response }]);
    } catch {
      onMessagesChange([
        ...nextMessages,
        { role: "assistant", content: "Sorry, I couldn't generate an explanation. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex h-[calc(100vh-7rem)] w-full flex-col rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Discuss Question</span>
        </div>
        <button onClick={onClose} className="rounded p-1 hover:bg-accent">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="chat-scroll flex-1 overflow-y-auto p-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Sparkles className="h-8 w-8 text-primary/40" />
            <p className="text-xs text-muted-foreground">
              Ask about this question to get tips and explanations. Your discussion will be saved with the mock review.
            </p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
            >
              <div
                className={cn(
                  "max-w-[92%] rounded-xl px-3 py-2 text-xs leading-relaxed",
                  message.role === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-secondary"
                )}
              >
                {message.role === "assistant" ? (
                  <MarkdownMessage content={message.content} />
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1 rounded-xl rounded-bl-sm bg-secondary px-3 py-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:300ms]" />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </div>

      {limitReached ? (
        <div className="border-t border-border p-3 text-center">
          <p className="text-[11px] text-muted-foreground">
            Discussion limit reached ({maxFreeMessages}/{maxFreeMessages}). Subscribe for unlimited discussions.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSend();
          }}
          className="flex gap-2 border-t border-border p-3"
        >
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask a question..."
            className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none ring-ring focus:ring-2"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-30"
          >
            {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
          </button>
          {isFreeUser && (
            <span className="self-center text-[9px] text-muted-foreground">{userMessageCount}/{maxFreeMessages}</span>
          )}
        </form>
      )}
    </div>
  );
}
