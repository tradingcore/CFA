import type { UserProfile } from "./firestore";

export const FREE_LIMITS = {
  chatMessages: 3,
  quizQuestions: 5,
};

export interface FreeUsage {
  chatMessages: number;
  quizQuestions: number;
  date: string;
}

/**
 * Checks if the user has an active subscription (trialing or active).
 * @param profile - User profile from Firestore
 * @returns true if the user has paid access
 */
export function isSubscribed(profile: UserProfile | null): boolean {
  if (!profile) return false;
  const status = profile.subscriptionStatus;
  return status === "trialing" || status === "active";
}

/**
 * Checks if the user can send chat messages (subscribed or under free limit).
 * @param profile - User profile
 * @returns true if chat is available
 */
function isToday(dateStr?: string): boolean {
  if (!dateStr) return false;
  return dateStr === new Date().toISOString().split("T")[0];
}

export function canUseChat(profile: UserProfile | null): boolean {
  if (isSubscribed(profile)) return true;
  if (!isToday(profile?.freeUsage?.date)) return true;
  const used = profile?.freeUsage?.chatMessages ?? 0;
  return used < FREE_LIMITS.chatMessages;
}

/**
 * Checks if the user can start a quiz (subscribed or under free limit).
 * @param profile - User profile
 * @returns true if quiz is available
 */
export function canUseQuiz(profile: UserProfile | null): boolean {
  if (isSubscribed(profile)) return true;
  if (!isToday(profile?.freeUsage?.date)) return true;
  const used = profile?.freeUsage?.quizQuestions ?? 0;
  return used < FREE_LIMITS.quizQuestions;
}

/**
 * Returns remaining free chat messages.
 * @param profile - User profile
 * @returns Number of remaining messages (Infinity if subscribed)
 */
export function getRemainingChat(profile: UserProfile | null): number {
  if (isSubscribed(profile)) return Infinity;
  if (!isToday(profile?.freeUsage?.date)) return FREE_LIMITS.chatMessages;
  const used = profile?.freeUsage?.chatMessages ?? 0;
  return Math.max(0, FREE_LIMITS.chatMessages - used);
}

/**
 * Returns remaining free quiz questions.
 * @param profile - User profile
 * @returns Number of remaining questions (Infinity if subscribed)
 */
export function getRemainingQuiz(profile: UserProfile | null): number {
  if (isSubscribed(profile)) return Infinity;
  if (!isToday(profile?.freeUsage?.date)) return FREE_LIMITS.quizQuestions;
  const used = profile?.freeUsage?.quizQuestions ?? 0;
  return Math.max(0, FREE_LIMITS.quizQuestions - used);
}
