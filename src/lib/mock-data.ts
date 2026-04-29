import { CFALevel } from "./cfa-topics";

export type SimuladoMode = "official" | "training";

export interface MockQuestion {
  id: string;
  topicId: string;
  moduleId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const EXAM_FORMAT: Record<CFALevel, { questionsPerSession: number; sessions: number; minutesPerSession: number; secondsPerQuestion: number; totalQuestions: number }> = {
  I: { questionsPerSession: 90, sessions: 2, minutesPerSession: 135, secondsPerQuestion: 90, totalQuestions: 180 },
  II: { questionsPerSession: 44, sessions: 2, minutesPerSession: 132, secondsPerQuestion: 180, totalQuestions: 88 },
  III: { questionsPerSession: 44, sessions: 2, minutesPerSession: 132, secondsPerQuestion: 180, totalQuestions: 88 },
};

export interface TopicScore {
  topicId: string;
  topicName: string;
  score: number;
  questionsAnswered: number;
  totalQuestions: number;
}

export interface SimuladoResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpentMinutes: number;
  topicBreakdown: { topicId: string; correct: number; total: number }[];
}

export interface StudyBlock {
  id: string;
  topicId: string;
  topicName: string;
  date: string;
  durationMinutes: number;
  completed: boolean;
  type: "reading" | "practice" | "review";
}

export interface WeeklyGoal {
  id: string;
  description: string;
  current: number;
  target: number;
  unit: string;
}

export interface WeeklyStats {
  questionsAnswered: number;
  correctAnswers: number;
  simuladosCompleted: number;
}

export const mockQuestions: Record<CFALevel, MockQuestion[]> = {
  I: [
    {
      id: "q1", topicId: "ethics", moduleId: "l1-et-03",
      question: "According to Standard I(A), which of the following is MOST likely a violation of Knowledge of the Law?",
      options: [
        "A member who unknowingly violates a securities regulation",
        "A member who does not report a colleague's suspected violation",
        "A member who follows local law when it is stricter than CFA standards",
        "A member who dissociates from a client who is breaking the law",
      ],
      correctIndex: 1,
      explanation: "Under Standard I(A), members must understand and comply with applicable laws and report violations. Not reporting a colleague's suspected violation is a breach of this standard.",
    },
    {
      id: "q2", topicId: "ethics", moduleId: "l1-et-03",
      question: "Under Standard III(B) Fair Dealing, an analyst should MOST appropriately:",
      options: [
        "Give preferential treatment to large institutional clients",
        "Disseminate investment recommendations to all clients simultaneously",
        "Prioritize family members' accounts",
        "Only share recommendations with paying clients",
      ],
      correctIndex: 1,
      explanation: "Standard III(B) requires fair dealing with all clients. Investment recommendations should be disseminated simultaneously to all clients, without preference.",
    },
    {
      id: "q3", topicId: "quant", moduleId: "l1-qm-02",
      question: "An investment of $10,000 earns 8% compounded annually. What is the value after 3 years?",
      options: ["$12,400.00", "$12,597.12", "$12,800.00", "$13,000.00"],
      correctIndex: 1,
      explanation: "FV = PV × (1 + r)^n = 10,000 × (1.08)^3 = 10,000 × 1.259712 = $12,597.12",
    },
    {
      id: "q4", topicId: "quant", moduleId: "l1-qm-08",
      question: "A Type I error in hypothesis testing occurs when:",
      options: [
        "The null hypothesis is incorrectly accepted",
        "The null hypothesis is incorrectly rejected",
        "The alternative hypothesis is correctly accepted",
        "The significance level is set too high",
      ],
      correctIndex: 1,
      explanation: "A Type I error occurs when we reject a true null hypothesis (false positive). The probability of this error equals the significance level (alpha).",
    },
    {
      id: "q5", topicId: "economics", moduleId: "l1-ec-01",
      question: "When the price of a good increases and the quantity demanded decreases, this is best explained by:",
      options: [
        "The income effect only",
        "The substitution effect only",
        "Both income and substitution effects",
        "The wealth effect",
      ],
      correctIndex: 2,
      explanation: "A price increase leads to both an income effect (real purchasing power decreases) and a substitution effect (consumers switch to cheaper alternatives).",
    },
    {
      id: "q6", topicId: "fra", moduleId: "l1-fs-07",
      question: "Under IFRS, which depreciation method is NOT permitted?",
      options: ["Straight-line", "Declining balance", "Units of production", "All are permitted under IFRS"],
      correctIndex: 3,
      explanation: "IFRS permits any systematic depreciation method that reflects the pattern of economic benefits, including straight-line, declining balance, and units of production.",
    },
    {
      id: "q7", topicId: "fra", moduleId: "l1-fs-10",
      question: "Which of the following is LEAST likely to be a warning sign of low-quality financial reporting?",
      options: [
        "Frequent changes in accounting policies",
        "Large discrepancies between net income and operating cash flow",
        "Consistent revenue growth aligned with industry trends",
        "Unusual related-party transactions",
      ],
      correctIndex: 2,
      explanation: "Consistent revenue growth aligned with industry trends is a sign of normal operations. The other options are common warning signs of potential earnings manipulation.",
    },
    {
      id: "q8", topicId: "corporate", moduleId: "l1-ci-06",
      question: "The weighted average cost of capital (WACC) is MOST accurately described as:",
      options: [
        "The cost of the firm's equity",
        "The required return on assets for a firm",
        "The marginal cost of raising new capital",
        "The cost of the firm's most recent debt issuance",
      ],
      correctIndex: 1,
      explanation: "WACC represents the required return on the firm's assets, weighted by the proportion of each source of capital in the firm's capital structure.",
    },
    {
      id: "q9", topicId: "equity",
      question: "The Gordon Growth Model is MOST appropriate for valuing a company that:",
      options: [
        "Has high and variable growth rates",
        "Does not pay dividends",
        "Pays dividends that grow at a stable rate",
        "Is in the early growth stage",
      ],
      correctIndex: 2,
      explanation: "The Gordon Growth Model (DDM) assumes dividends grow at a constant rate indefinitely, making it most appropriate for mature, stable dividend-paying companies.",
    },
    {
      id: "q10", topicId: "equity",
      question: "A price-to-earnings (P/E) ratio is MOST useful when comparing companies:",
      options: [
        "Across different industries",
        "Within the same industry with similar growth prospects",
        "With negative earnings",
        "With very different capital structures",
      ],
      correctIndex: 1,
      explanation: "P/E ratios are most useful for comparing companies within the same industry that have similar growth rates, risk, and accounting methods.",
    },
    {
      id: "q11", topicId: "fi",
      question: "If interest rates increase, the price of a bond will:",
      options: [
        "Increase if it is a premium bond",
        "Decrease, and the decrease will be larger for longer-duration bonds",
        "Remain unchanged if it has a floating coupon",
        "Increase for zero-coupon bonds only",
      ],
      correctIndex: 1,
      explanation: "Bond prices move inversely to interest rates. The longer the duration, the greater the price sensitivity to interest rate changes.",
    },
    {
      id: "q12", topicId: "fi",
      question: "Convexity is important in bond analysis because it:",
      options: [
        "Replaces duration as a risk measure",
        "Measures the curvature of the price-yield relationship and improves duration estimates",
        "Is only relevant for floating-rate bonds",
        "Has no practical application",
      ],
      correctIndex: 1,
      explanation: "Convexity captures the non-linear (curved) relationship between bond prices and yields, providing a second-order adjustment that improves the accuracy of duration-based price change estimates.",
    },
    {
      id: "q13", topicId: "derivatives",
      question: "The value of a call option at expiration is BEST described as:",
      options: [
        "Max(0, Strike - Spot)",
        "Max(0, Spot - Strike)",
        "Spot - Strike",
        "Strike - Spot",
      ],
      correctIndex: 1,
      explanation: "A call option gives the holder the right to buy at the strike price. Its intrinsic value at expiration is max(0, Spot - Strike).",
    },
    {
      id: "q14", topicId: "derivatives",
      question: "Put-call parity for European options states that:",
      options: [
        "Call + PV(Strike) = Put + Stock",
        "Call + Stock = Put + PV(Strike)",
        "Call - Put = Stock - PV(Strike)",
        "Call + Put = Stock + PV(Strike)",
      ],
      correctIndex: 2,
      explanation: "Put-call parity: C - P = S - PV(X). This means Call - Put = Stock - Present Value of Strike Price.",
    },
    {
      id: "q15", topicId: "alts",
      question: "Which characteristic is LEAST likely associated with alternative investments?",
      options: [
        "Low liquidity",
        "High transparency",
        "Limited historical data",
        "Complex fee structures",
      ],
      correctIndex: 1,
      explanation: "Alternative investments typically have low transparency. They are characterized by low liquidity, limited historical data, and complex fee structures (e.g., 2 and 20).",
    },
    {
      id: "q16", topicId: "pm",
      question: "According to Modern Portfolio Theory, the optimal portfolio lies on the:",
      options: [
        "Security Market Line",
        "Capital Market Line",
        "Capital Allocation Line",
        "Efficient Frontier",
      ],
      correctIndex: 3,
      explanation: "The efficient frontier represents all portfolios that offer the highest expected return for each level of risk. The optimal portfolio for an investor lies on this frontier.",
    },
    {
      id: "q17", topicId: "pm",
      question: "Which behavioral bias involves overweighting recent events when making decisions?",
      options: [
        "Anchoring bias",
        "Recency bias",
        "Confirmation bias",
        "Overconfidence bias",
      ],
      correctIndex: 1,
      explanation: "Recency bias is the tendency to overweight recent events and trends when forming expectations, potentially leading to extrapolation of short-term trends.",
    },
    {
      id: "q18", topicId: "economics",
      question: "An expansionary fiscal policy is MOST likely characterized by:",
      options: [
        "Increased taxes and reduced government spending",
        "Reduced taxes and increased government spending",
        "Higher interest rates set by the central bank",
        "Selling government securities in open market operations",
      ],
      correctIndex: 1,
      explanation: "Expansionary fiscal policy involves reducing taxes and/or increasing government spending to stimulate economic activity. The other options describe contractionary or monetary policy.",
    },
    {
      id: "q19", topicId: "corporate",
      question: "According to Modigliani-Miller Proposition I (without taxes), the value of a firm is:",
      options: [
        "Maximized by using 100% debt financing",
        "Independent of its capital structure",
        "Minimized when WACC is highest",
        "Dependent on the dividend payout ratio",
      ],
      correctIndex: 1,
      explanation: "MM Proposition I (no taxes) states that the total value of a firm is independent of its capital structure. The value depends on the firm's asset cash flows, not on how it is financed.",
    },
    {
      id: "q20", topicId: "alts",
      question: "The 'J-curve effect' in private equity refers to:",
      options: [
        "The tendency for PE funds to show negative returns early, then positive returns later",
        "The shape of the supply curve for PE investments",
        "The correlation between PE and public equity returns",
        "The relationship between fund size and returns",
      ],
      correctIndex: 0,
      explanation: "The J-curve effect describes the common pattern in PE fund returns: negative returns in early years (due to fees, capital calls, and unrealized investments) followed by positive returns as portfolio companies mature and are exited.",
    },
  ],
  II: [
    {
      id: "q2-1", topicId: "ethics",
      question: "An analyst covering a stock receives material nonpublic information. According to CFA standards, she should MOST appropriately:",
      options: [
        "Trade on the information before it becomes public",
        "Share it only with her firm's portfolio managers",
        "Refrain from trading and not share the information",
        "Publish the information in her research report",
      ],
      correctIndex: 2,
      explanation: "Standard II(A) prohibits acting on or sharing material nonpublic information until it is publicly disseminated.",
    },
    {
      id: "q2-2", topicId: "equity",
      question: "In a multi-stage DDM, the terminal value is MOST commonly estimated using:",
      options: [
        "Book value of equity",
        "The Gordon Growth Model applied at the end of the high-growth period",
        "A simple average of all prior dividends",
        "The initial stock price adjusted for inflation",
      ],
      correctIndex: 1,
      explanation: "In a multi-stage DDM, the terminal value is typically calculated using the Gordon Growth Model (constant-growth DDM) applied to the first dividend in the stable-growth phase.",
    },
    {
      id: "q2-3", topicId: "fi",
      question: "When valuing a callable bond using a binomial tree, the callable bond's value will be:",
      options: [
        "Greater than the value of an otherwise identical option-free bond",
        "Equal to the value of an option-free bond plus the value of the call option",
        "Less than or equal to the value of an otherwise identical option-free bond",
        "Independent of interest rate volatility",
      ],
      correctIndex: 2,
      explanation: "A callable bond = option-free bond - call option value. The issuer holds the call, so it reduces the bond's value to the investor.",
    },
  ],
  III: [
    {
      id: "q3-1", topicId: "ethics",
      question: "In developing an Investment Policy Statement for a private wealth client, which factor is LEAST important?",
      options: [
        "Risk tolerance",
        "Time horizon",
        "The manager's personal investment preferences",
        "Tax considerations",
      ],
      correctIndex: 2,
      explanation: "The IPS should reflect the client's needs and circumstances, not the manager's personal preferences.",
    },
    {
      id: "q3-2", topicId: "asset-allocation",
      question: "Mean-variance optimization is LEAST likely limited by:",
      options: [
        "Sensitivity to input assumptions",
        "The requirement for normally distributed returns",
        "Its use of historical return data",
        "Its ability to incorporate investor constraints",
      ],
      correctIndex: 3,
      explanation: "MVO can incorporate constraints (budget, min/max allocations). Its main limitations are sensitivity to inputs, assumption of normality, and reliance on historical data.",
    },
  ],
};

export const mockTopicScores: Record<CFALevel, TopicScore[]> = {
  I: [
    { topicId: "ethics", topicName: "Ethics", score: 78, questionsAnswered: 45, totalQuestions: 60 },
    { topicId: "quant", topicName: "Quant", score: 65, questionsAnswered: 30, totalQuestions: 50 },
    { topicId: "economics", topicName: "Economics", score: 55, questionsAnswered: 25, totalQuestions: 50 },
    { topicId: "fra", topicName: "FSA", score: 42, questionsAnswered: 35, totalQuestions: 70 },
    { topicId: "corporate", topicName: "Corporate", score: 70, questionsAnswered: 20, totalQuestions: 40 },
    { topicId: "equity", topicName: "Equity", score: 60, questionsAnswered: 28, totalQuestions: 55 },
    { topicId: "fi", topicName: "Fixed Income", score: 48, questionsAnswered: 22, totalQuestions: 55 },
    { topicId: "derivatives", topicName: "Derivatives", score: 72, questionsAnswered: 18, totalQuestions: 30 },
    { topicId: "alts", topicName: "Alternatives", score: 80, questionsAnswered: 15, totalQuestions: 30 },
    { topicId: "pm", topicName: "Portfolio Mgmt", score: 58, questionsAnswered: 20, totalQuestions: 50 },
  ],
  II: [
    { topicId: "ethics", topicName: "Ethics", score: 70, questionsAnswered: 20, totalQuestions: 30 },
    { topicId: "quant", topicName: "Quant", score: 55, questionsAnswered: 10, totalQuestions: 20 },
    { topicId: "economics", topicName: "Economics", score: 60, questionsAnswered: 10, totalQuestions: 20 },
    { topicId: "fra", topicName: "FSA", score: 45, questionsAnswered: 15, totalQuestions: 30 },
    { topicId: "corporate", topicName: "Corporate", score: 65, questionsAnswered: 10, totalQuestions: 20 },
    { topicId: "equity", topicName: "Equity", score: 50, questionsAnswered: 15, totalQuestions: 30 },
    { topicId: "fi", topicName: "Fixed Income", score: 55, questionsAnswered: 15, totalQuestions: 30 },
    { topicId: "derivatives", topicName: "Derivatives", score: 60, questionsAnswered: 10, totalQuestions: 20 },
    { topicId: "alts", topicName: "Alternatives", score: 70, questionsAnswered: 15, totalQuestions: 30 },
    { topicId: "pm", topicName: "Portfolio Mgmt", score: 58, questionsAnswered: 15, totalQuestions: 30 },
  ],
  III: [
    { topicId: "ethics", topicName: "Ethics", score: 72, questionsAnswered: 15, totalQuestions: 25 },
    { topicId: "asset-allocation", topicName: "Asset Alloc", score: 48, questionsAnswered: 18, totalQuestions: 40 },
    { topicId: "portfolio-construction", topicName: "Port Const", score: 55, questionsAnswered: 12, totalQuestions: 25 },
    { topicId: "performance", topicName: "Performance", score: 60, questionsAnswered: 8, totalQuestions: 15 },
    { topicId: "derivatives-risk", topicName: "Deriv/Risk", score: 52, questionsAnswered: 12, totalQuestions: 25 },
    { topicId: "pw-pathway", topicName: "Priv Wealth", score: 45, questionsAnswered: 20, totalQuestions: 40 },
    { topicId: "pmkt-pathway", topicName: "Priv Mkts", score: 58, questionsAnswered: 12, totalQuestions: 25 },
    { topicId: "ppm-pathway", topicName: "PM Path", score: 65, questionsAnswered: 12, totalQuestions: 25 },
  ],
};

export const mockWeeklyStats: Record<CFALevel, WeeklyStats> = {
  I: { questionsAnswered: 45, correctAnswers: 30, simuladosCompleted: 2 },
  II: { questionsAnswered: 22, correctAnswers: 14, simuladosCompleted: 1 },
  III: { questionsAnswered: 15, correctAnswers: 10, simuladosCompleted: 1 },
};

export const mockSimuladoHistory: SimuladoResult[] = [
  {
    id: "sim-1", date: "2026-04-28", score: 68, totalQuestions: 20, correctAnswers: 14, timeSpentMinutes: 35,
    topicBreakdown: [
      { topicId: "ethics", correct: 3, total: 4 },
      { topicId: "quant", correct: 2, total: 3 },
      { topicId: "fra", correct: 1, total: 3 },
      { topicId: "equity", correct: 3, total: 4 },
      { topicId: "fi", correct: 2, total: 3 },
      { topicId: "pm", correct: 3, total: 3 },
    ],
  },
  {
    id: "sim-2", date: "2026-04-25", score: 60, totalQuestions: 20, correctAnswers: 12, timeSpentMinutes: 42,
    topicBreakdown: [
      { topicId: "economics", correct: 2, total: 4 },
      { topicId: "corporate", correct: 3, total: 4 },
      { topicId: "derivatives", correct: 2, total: 3 },
      { topicId: "alts", correct: 3, total: 3 },
      { topicId: "fra", correct: 1, total: 3 },
      { topicId: "fi", correct: 1, total: 3 },
    ],
  },
];

export const mockStudyPlan: StudyBlock[] = [
  { id: "sb-1", topicId: "fra", topicName: "Financial Statement Analysis", date: "2026-04-29", durationMinutes: 90, completed: false, type: "reading" },
  { id: "sb-2", topicId: "fi", topicName: "Fixed Income", date: "2026-04-29", durationMinutes: 60, completed: false, type: "practice" },
  { id: "sb-3", topicId: "ethics", topicName: "Ethics", date: "2026-04-29", durationMinutes: 45, completed: true, type: "review" },
  { id: "sb-4", topicId: "quant", topicName: "Quantitative Methods", date: "2026-04-30", durationMinutes: 90, completed: false, type: "reading" },
  { id: "sb-5", topicId: "economics", topicName: "Economics", date: "2026-04-30", durationMinutes: 60, completed: false, type: "practice" },
  { id: "sb-6", topicId: "fra", topicName: "Financial Statement Analysis", date: "2026-05-01", durationMinutes: 90, completed: false, type: "practice" },
  { id: "sb-7", topicId: "equity", topicName: "Equity Investments", date: "2026-05-01", durationMinutes: 60, completed: false, type: "reading" },
  { id: "sb-8", topicId: "fi", topicName: "Fixed Income", date: "2026-05-02", durationMinutes: 90, completed: false, type: "reading" },
  { id: "sb-9", topicId: "pm", topicName: "Portfolio Management", date: "2026-05-02", durationMinutes: 60, completed: false, type: "practice" },
  { id: "sb-10", topicId: "derivatives", topicName: "Derivatives", date: "2026-05-03", durationMinutes: 45, completed: false, type: "review" },
  { id: "sb-11", topicId: "corporate", topicName: "Corporate Issuers", date: "2026-05-03", durationMinutes: 60, completed: false, type: "reading" },
  { id: "sb-12", topicId: "alts", topicName: "Alternative Investments", date: "2026-05-04", durationMinutes: 45, completed: false, type: "review" },
];

export const mockWeeklyGoals: WeeklyGoal[] = [
  { id: "g-1", description: "Questões respondidas", current: 45, target: 100, unit: "questões" },
  { id: "g-2", description: "Simulados completos", current: 2, target: 3, unit: "simulados" },
  { id: "g-3", description: "Tópicos revisados", current: 3, target: 5, unit: "tópicos" },
];

export const examDates: Record<CFALevel, string> = {
  I: "2026-08-25",
  II: "2026-08-26",
  III: "2026-08-27",
};

/**
 * Calculates the number of days remaining until the exam for a given CFA level.
 * @param level - CFA level
 * @returns Number of days until exam (negative if past)
 */
export function getDaysUntilExam(level: CFALevel): number {
  const examDate = new Date(examDates[level]);
  const today = new Date();
  const diff = examDate.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

/**
 * Computes the weekly progress as a percentage (questions answered / weekly target).
 * @param level - CFA level
 * @returns Weekly progress percentage
 */
export function getWeeklyProgress(level: CFALevel): number {
  const stats = mockWeeklyStats[level];
  const weeklyTarget = 100;
  return Math.min(100, Math.round((stats.questionsAnswered / weeklyTarget) * 100));
}

/**
 * Computes the weekly accuracy as a percentage.
 * @param level - CFA level
 * @returns Weekly accuracy percentage
 */
export function getWeeklyAccuracy(level: CFALevel): number {
  const stats = mockWeeklyStats[level];
  if (stats.questionsAnswered === 0) return 0;
  return Math.round((stats.correctAnswers / stats.questionsAnswered) * 100);
}
