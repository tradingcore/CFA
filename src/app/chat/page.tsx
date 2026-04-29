"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Sparkles, ImagePlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Olá! Sou seu assistente de estudos para o CFA. Posso ajudar com dúvidas sobre qualquer tópico do curriculum, explicar conceitos, sugerir estratégias de estudo ou discutir seu progresso. Você também pode enviar fotos de questões ou anotações!",
  timestamp: new Date(),
};

const KEYWORD_RESPONSES: Record<string, string> = {
  ethics:
    "Ethics é um dos tópicos mais importantes do CFA — vale 15-20% no Level I! Foque em memorizar os Standards I-VII e pratique com exemplos de aplicação. Dica: leia o handbook de ética pelo menos duas vezes antes da prova.",
  quant:
    "Quantitative Methods cobre desde TVM até regressão linear. A chave é dominar as fórmulas e saber quando aplicá-las. Recomendo fazer muitas questões práticas, especialmente de hypothesis testing e probability.",
  derivatives:
    "Derivatives pode parecer complexo, mas os conceitos fundamentais são intuitivos. Comece entendendo forwards e futures, depois avance para options. A put-call parity é essencial — aparece com frequência na prova.",
  "fixed income":
    "Fixed Income tem peso alto (11-14% no Level I). Foque em bond valuation, duration/convexity, e term structure. Entender a relação inversa entre preço e yield é fundamental.",
  fra:
    "Financial Statement Analysis é um dos tópicos mais extensos. Domine os três demonstrativos (income statement, balance sheet, cash flow) e as métricas de análise como DuPont. Pratique bastante ratio analysis.",
  plano:
    "Para montar um bom plano de estudos, recomendo: 1) Comece pelos tópicos com maior peso, 2) Dedique 15% do tempo a Ethics, 3) Faça simulados semanais, 4) Revise os tópicos fracos com maior frequência.",
  simulado:
    "Fazer simulados regularmente é crucial! Recomendo pelo menos 2-3 por semana nas últimas 6 semanas antes da prova. Analise cada erro para entender o padrão das questões.",
  dica:
    "Aqui vão algumas dicas valiosas: 1) Estude pelo menos 300 horas no total, 2) Use a regra 40/60 (40% leitura, 60% prática), 3) Não subestime Ethics — pode ser o diferencial entre passar e reprovar, 4) Durma bem na véspera!",
};

const GENERIC_RESPONSES = [
  "Ótima pergunta! Esse é um conceito importante para o CFA. A chave é entender os fundamentos antes de avançar para as aplicações práticas. Quer que eu aprofunde em algum aspecto específico?",
  "Recomendo revisar esse tema com questões práticas. A melhor forma de fixar o conteúdo do CFA é através da repetição espaçada — estude, pratique, revise.",
  "Esse é um dos pontos que costuma aparecer na prova. Sugiro focar nos exemplos do curriculum oficial e fazer as practice questions do final de cada reading.",
  "De acordo com o seu perfil de estudos, seria bom dedicar mais tempo a esse assunto. Tente a técnica de Feynman: explique o conceito como se estivesse ensinando alguém.",
  "Para melhorar sua compreensão, tente conectar esse tópico com outros relacionados. No CFA, muitos conceitos se interligam — por exemplo, equity valuation usa conceitos de quant e accounting.",
];

const IMAGE_RESPONSES = [
  "Recebi sua imagem! Analisando a questão... Parece ser sobre um conceito fundamental do CFA. A alternativa correta geralmente envolve aplicar a definição direta do curriculum. Quer que eu explique passo a passo?",
  "Obrigado pela foto! Consigo ver a questão. Para resolver, é importante identificar primeiro qual conceito está sendo testado e depois aplicar a fórmula ou definição correspondente. Vou detalhar a resolução.",
  "Imagem recebida! Essa questão está relacionada a um tópico que costuma cair com frequência na prova. Vou analisar cada alternativa e explicar por que a correta é a melhor resposta.",
  "Recebi a foto da sua dúvida! Vamos resolver juntos. O primeiro passo é identificar os dados fornecidos e qual fórmula ou conceito precisamos aplicar. Me diga se quer uma explicação detalhada.",
];

function findResponse(input: string, hasImage: boolean): string {
  if (hasImage) {
    return IMAGE_RESPONSES[Math.floor(Math.random() * IMAGE_RESPONSES.length)];
  }
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(KEYWORD_RESPONSES)) {
    if (lower.includes(keyword)) return response;
  }
  return GENERIC_RESPONSES[Math.floor(Math.random() * GENERIC_RESPONSES.length)];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingImage, setPendingImage] = useState<{ url: string; file: File } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;

    const url = URL.createObjectURL(file);
    setPendingImage({ url, file });

    if (e.target) e.target.value = "";
  };

  const removePendingImage = () => {
    if (pendingImage) {
      URL.revokeObjectURL(pendingImage.url);
      setPendingImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !pendingImage) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim(),
      imageUrl: pendingImage?.url,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = input.trim();
    const hadImage = !!pendingImage;
    setInput("");
    setPendingImage(null);
    setIsTyping(true);

    setTimeout(() => {
      const response = findResponse(query, hadImage);
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, hadImage ? 1200 + Math.random() * 800 : 800 + Math.random() * 700);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          const url = URL.createObjectURL(file);
          setPendingImage({ url, file });
        }
        return;
      }
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-3xl flex-col">
      <div className="flex-1 overflow-y-auto pb-4">
        {messages.length === 1 && (
          <div className="flex flex-col items-center gap-4 pt-12 pb-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Chat CFA</h1>
            <p className="max-w-md text-center text-sm text-muted-foreground">
              Pergunte sobre qualquer tópico do CFA, envie fotos de questões
              ou anotações para tirar dúvidas.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6 px-2 sm:px-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
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
                  <span className="text-xs font-bold">Eu</span>
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "rounded-tr-md bg-primary text-primary-foreground"
                    : "rounded-tl-md bg-card border border-border"
                )}
              >
                {msg.imageUrl && (
                  <div className="mb-2 overflow-hidden rounded-lg">
                    <Image
                      src={msg.imageUrl}
                      alt="Imagem enviada"
                      width={300}
                      height={200}
                      className="h-auto max-h-60 w-full object-contain"
                      unoptimized
                    />
                  </div>
                )}
                {msg.content && <p>{msg.content}</p>}
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
        {/* Pending image preview */}
        {pendingImage && (
          <div className="mb-3 flex items-start gap-2">
            <div className="relative inline-block overflow-hidden rounded-lg border border-border">
              <Image
                src={pendingImage.url}
                alt="Preview"
                width={120}
                height={80}
                className="h-20 w-auto object-cover"
                unoptimized
              />
              <button
                onClick={removePendingImage}
                className="absolute -right-0 -top-0 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white shadow"
                aria-label="Remover imagem"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
            <span className="text-xs text-muted-foreground mt-1">{pendingImage.file.name}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative flex items-end gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-input bg-card text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Enviar imagem"
            title="Enviar foto de questão ou anotação"
          >
            <ImagePlus className="h-5 w-5" />
          </button>

          <div className="relative flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder="Pergunte sobre CFA ou cole uma imagem..."
              rows={1}
              className="w-full resize-none rounded-xl border border-input bg-card px-4 py-3 pr-14 text-sm outline-none ring-ring transition-shadow placeholder:text-muted-foreground focus:ring-2"
            />
            <button
              type="submit"
              disabled={(!input.trim() && !pendingImage) || isTyping}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-30"
              aria-label="Enviar"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          Respostas geradas com IA (mock). Envie fotos de questões, anotações ou dúvidas.
        </p>
      </div>
    </div>
  );
}
