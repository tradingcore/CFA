"use client";

import { useAuth } from "@/contexts/auth-context";
import { isSubscribed, canUseChat, canUseQuiz, getRemainingChat, getRemainingQuiz } from "@/lib/usage-limits";

/**
 * Hook that exposes subscription status and usage limits derived from the user profile.
 * @returns Subscription and usage information
 */
export function useSubscription() {
  const { profile } = useAuth();

  return {
    isSubscribed: isSubscribed(profile),
    isPastDue: profile?.subscriptionStatus === "past_due",
    canChat: canUseChat(profile),
    canQuiz: canUseQuiz(profile),
    remainingChat: getRemainingChat(profile),
    remainingQuiz: getRemainingQuiz(profile),
    subscriptionStatus: profile?.subscriptionStatus ?? "none",
  };
}
