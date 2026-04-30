"use client";

import { useState, useRef, useEffect } from "react";
import type { GeneratedQuestion } from "@/lib/api";
import { apiChat } from "@/lib/api";
import { useLevel } from "@/contexts/level-context";
import { MarkdownMessage } from "@/components/chat/markdown-message";
import { X, Send, Sparkles, MessageCircle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizChatProps {
  question: GeneratedQuestion;
  selectedIndex: number | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}


/**
 * Contextual chat panel for training mode, providing discussion about the current question.
 * @param question - The current quiz question for context
 * @param isOpen - Whether the chat panel is visible
 * @param onClose - Callback to close the panel
 * @returns Chat panel component
 */
export function QuizChat({ question, selectedIndex, isOpen, onClose }: QuizChatProps) {
  const { level } = useLevel();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const prevQuestionId = useRef(question.id);

  useEffect(() => {
    if (question.id !== prevQuestionId.current) {
      prevQuestionId.current = question.id;
      setMessages([{
        id: "ctx",
        role: "assistant",
        content: `We're discussing the question: "${question.question.slice(0, 100)}..." — What would you like to know?`,
      }]);
    }
  }, [question]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMsg = { id: `u-${Date.now()}`, role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const optionLines = question.options.map((option, index) => `${String.fromCharCode(65 + index)}. ${option}`).join("\n");
      const selectedContext = selectedIndex != null
        ? `The student selected ${String.fromCharCode(65 + selectedIndex)}. The correct answer is ${String.fromCharCode(65 + question.correctIndex)}.`
        : `The student has not selected an answer yet. Do not reveal the correct answer unless explicitly asked.`;
      const history = messages.map((message) => ({ role: message.role, content: message.content }));
      const { response } = await apiChat({
        message: input.trim(),
        history,
        level,
        topicContext: `Current CFA practice question:\n${question.question}\n\nOptions:\n${optionLines}\n\n${selectedContext}`,
      });
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: response }]);
    } catch {
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: "Sorry, I couldn't generate an explanation. Please try again." }]);
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

      <div className="flex-1 overflow-y-auto p-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Sparkles className="h-8 w-8 text-primary/40" />
            <p className="text-xs text-muted-foreground">Ask about this question to get tips and explanations.</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[92%] rounded-xl px-3 py-2 text-xs leading-relaxed",
                m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm"
              )}>
                {m.role === "assistant" ? <MarkdownMessage content={m.content} /> : m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 border-t border-border p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none ring-ring focus:ring-2"
        />
        <button type="submit" disabled={!input.trim() || loading} className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-30">
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
        </button>
      </form>
    </div>
  );
}
