"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  updateProfile,
} from "firebase/auth";
import { auth, GOOGLE_CLIENT_ID } from "@/lib/firebase";
import { getUserProfile, createUserProfile, UserProfile } from "@/lib/firestore";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadGoogleScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById("google-gsi")) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.id = "google-gsi";
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Sign-In"));
    document.head.appendChild(script);
  });
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadProfile(u: User) {
    const p = await getUserProfile(u.uid);
    setProfile(p);
    return p;
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        await loadProfile(u);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const signIn = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await loadProfile(cred.user);
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    await createUserProfile(cred.user.uid, {
      email,
      displayName,
    });
    await loadProfile(cred.user);
  };

  const signInWithGoogle = useCallback(async () => {
    await loadGoogleScript();

    const idToken = await new Promise<string>((resolve, reject) => {
      const google = (window as unknown as { google: { accounts: { id: {
        initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
        prompt: (callback?: (notification: { isNotDisplayed: () => boolean; isSkippedMoment: () => boolean }) => void) => void;
      }}}}).google;

      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (response) => {
          resolve(response.credential);
        },
      });

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          reject(new Error("Google Sign-In prompt was blocked. Please allow popups and try again."));
        }
      });
    });

    const credential = GoogleAuthProvider.credential(idToken);
    const cred = await signInWithCredential(auth, credential);

    const existing = await getUserProfile(cred.user.uid);
    if (!existing) {
      await createUserProfile(cred.user.uid, {
        email: cred.user.email || "",
        displayName: cred.user.displayName || "",
        photoURL: cred.user.photoURL || undefined,
      });
    }
    await loadProfile(cred.user);
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUser(null);
    setProfile(null);
  };

  const refreshProfile = async () => {
    if (user) await loadProfile(user);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signIn, signUp, signInWithGoogle, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
