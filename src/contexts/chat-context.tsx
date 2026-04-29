"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatContextType {
  messages: ChatMessage[];
  isOpen: boolean;
  toggleChat: () => void;
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const MOCK_RESPONSES = [
  "Ótima pergunta! No CFA Level I, esse tópico é cobrado com frequência. A chave é entender os conceitos fundamentais antes de avançar para as fórmulas.",
  "Recomendo revisar esse tema usando a abordagem de questões práticas. Tente resolver pelo menos 10 questões por dia sobre esse assunto.",
  "Esse é um dos tópicos mais desafiadores do CFA. Vou preparar um resumo detalhado para você. Por enquanto, foque nos exemplos do curriculum.",
  "De acordo com o seu desempenho, sugiro dedicar mais tempo a Financial Statement Analysis e Fixed Income, que são suas áreas mais fracas.",
  "Para melhorar sua taxa de acerto, tente a técnica de eliminação: descarte as alternativas claramente incorretas antes de escolher a resposta.",
  "Lembre-se: no CFA, Ethics tem um peso significativo e pode fazer a diferença entre passar e não passar. Dedique pelo menos 15% do seu tempo de estudo a esse tópico.",
];

/**
 * Provider that manages the chat state (messages, open/close, mock responses).
 * @param children - React children to wrap
 * @returns Chat context provider
 */
export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Olá! Sou seu assistente de estudos para o CFA. Pergunte qualquer coisa sobre a prova, tópicos específicos ou seu progresso. Como posso ajudar?",
      timestamp: new Date(),
    },
  ]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => setIsOpen((prev) => !prev);

  const sendMessage = (content: string) => {
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const response = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 800);
  };

  return (
    <ChatContext.Provider value={{ messages, isOpen, toggleChat, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
}

/**
 * Hook to access chat state and actions.
 * @returns { messages, isOpen, toggleChat, sendMessage }
 * @throws Error if used outside ChatProvider
 */
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error("useChat must be used within ChatProvider");
  return context;
}
