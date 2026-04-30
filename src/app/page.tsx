"use client";

import { TrendingUp, Brain, Target, BarChart3, MessageCircle, CalendarDays, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Brain,
    title: "Questões geradas por IA",
    desc: "Questões no estilo CFA criadas em tempo real, personalizadas para seus pontos fracos.",
  },
  {
    icon: Target,
    title: "Simulados realistas",
    desc: "Modo oficial com timer ou treinamento com feedback instantâneo a cada questão.",
  },
  {
    icon: BarChart3,
    title: "Mapa de desempenho",
    desc: "Visualize seus pontos fortes e fracos em radar chart por tópico do CFA.",
  },
  {
    icon: MessageCircle,
    title: "Chat com tutor IA",
    desc: "Tire dúvidas sobre qualquer tópico. Respostas contextualizadas ao curriculum CFA.",
  },
  {
    icon: CalendarDays,
    title: "Plano de estudos inteligente",
    desc: "IA cria um plano personalizado baseado na sua data de prova e desempenho.",
  },
  {
    icon: CheckCircle2,
    title: "Progresso por LOS",
    desc: "Acompanhe cada Learning Outcome Statement estudado, módulo por módulo.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Nav */}
      <header className="flex items-center justify-between px-6 py-4 sm:px-12">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">Trading Core</span>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Entrar
          </Link>
          <Link
            href="/registro"
            className="rounded-xl bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Começar grátis
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-medium text-primary">
          <Brain className="h-3.5 w-3.5" />
          Powered by GPT-4o
        </div>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Seu <span className="text-primary">melhor parceiro</span> de estudos para o CFA
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Questões geradas por IA, simulados realistas, plano de estudos personalizado
          e tutor inteligente — tudo em um só lugar.
        </p>
        <div className="flex items-center gap-4 pt-2">
          <Link
            href="/registro"
            className="flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:opacity-90 hover:shadow-xl"
          >
            Começar agora <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-card/50 px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
            Tudo que você precisa para passar no CFA
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Level I, II e III — curriculum 2026 completo
          </p>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 sm:px-12">
        <div className="mx-auto max-w-md">
          <h2 className="mb-4 text-center text-2xl font-bold sm:text-3xl">
            Plano simples, sem surpresas
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            Acesso completo a todas as funcionalidades
          </p>

          <div className="rounded-2xl border-2 border-primary bg-card p-8 shadow-xl">
            <div className="mb-6 text-center">
              <span className="text-5xl font-bold">$40</span>
              <span className="text-muted-foreground">/mês</span>
            </div>
            <ul className="mb-8 flex flex-col gap-3">
              {[
                "Questões ilimitadas geradas por IA",
                "Simulados oficiais e treinamento",
                "Chat com tutor IA 24/7",
                "Plano de estudos personalizado",
                "Mapa de desempenho detalhado",
                "Progresso LOS por módulo",
                "CFA Level I, II e III",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/registro"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Começar agora <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 text-center text-xs text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="font-semibold text-foreground">Trading Core</span>
        </div>
        <p className="mt-2">© {new Date().getFullYear()} Trading Core. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
