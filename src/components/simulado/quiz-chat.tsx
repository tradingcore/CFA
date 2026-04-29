"use client";

import { useState, useRef, useEffect } from "react";
import { MockQuestion } from "@/lib/mock-data";
import { X, Send, Sparkles, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizChatProps {
  question: MockQuestion;
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMsg {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const CONTEXTUAL_RESPONSES = [
  "Essa questão testa um conceito fundamental. Pense no que cada alternativa implica e elimine as que contradizem os princípios básicos.",
  "Dica: releia o enunciado com cuidado. Palavras como 'MOST likely', 'LEAST likely' e 'BEST described' são cruciais para a resposta correta.",
  "Tente associar essa questão com os LOS do módulo correspondente. O CFA cobra exatamente o que está nos Learning Outcome Statements.",
  "Uma boa estratégia é eliminar primeiro as alternativas claramente incorretas. Geralmente uma das três opções pode ser descartada rapidamente.",
  "Pense em como esse conceito se aplica na prática. O CFA valoriza a compreensão aplicada, não apenas memorização.",
];

/**
 * Contextual chat panel for training mode, providing discussion about the current question.
 * @param question - The current quiz question for context
 * @param isOpen - Whether the chat panel is visible
 * @param onClose - Callback to close the panel
 * @returns Chat panel component
 */
export function QuizChat({ question, isOpen, onClose }: QuizChatProps) {
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
        content: `Estamos discutindo a questão: "${question.question.slice(0, 100)}..." — O que gostaria de saber?`,
      }]);
    }
  }, [question]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: ChatMsg = { id: `u-${Date.now()}`, role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const resp = CONTEXTUAL_RESPONSES[Math.floor(Math.random() * CONTEXTUAL_RESPONSES.length)];
      setMessages((prev) => [...prev, { id: `a-${Date.now()}`, role: "assistant", content: resp }]);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="flex h-full w-80 flex-col border-l border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Discutir Questão</span>
        </div>
        <button onClick={onClose} className="rounded p-1 hover:bg-accent">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <Sparkles className="h-8 w-8 text-primary/40" />
            <p className="text-xs text-muted-foreground">Pergunte sobre esta questão para receber dicas e explicações.</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          {messages.map((m) => (
            <div key={m.id} className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div className={cn(
                "max-w-[90%] rounded-xl px-3 py-2 text-xs leading-relaxed",
                m.role === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm"
              )}>
                {m.content}
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
          placeholder="Pergunte..."
          className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-xs outline-none ring-ring focus:ring-2"
        />
        <button type="submit" disabled={!input.trim()} className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground disabled:opacity-30">
          <Send className="h-3 w-3" />
        </button>
      </form>
    </div>
  );
}
