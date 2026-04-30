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
  "Great question! In CFA Level I, this topic comes up frequently. The key is understanding the fundamental concepts before moving on to the formulas.",
  "I recommend reviewing this topic using a practice-questions approach. Try solving at least 10 questions per day on this subject.",
  "This is one of the most challenging CFA topics. I'll prepare a detailed summary for you. For now, focus on the curriculum examples.",
  "Based on your performance, I suggest spending more time on Financial Statement Analysis and Fixed Income, which are your weakest areas.",
  "To improve your accuracy rate, try the elimination technique: rule out the clearly incorrect options before choosing your answer.",
  "Remember: in the CFA, Ethics carries significant weight and can make the difference between passing and failing. Dedicate at least 15% of your study time to this topic.",
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
      content: "Hi! I'm your CFA study assistant. Ask me anything about the exam, specific topics, or your progress. How can I help?",
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
