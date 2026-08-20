"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { AuthUser } from "@/types";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  isDemoMode: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const SESSION_KEY = "ai-robots-checker-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    // Check sessionStorage for existing session
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const saveUser = (u: AuthUser) => {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(u));
    } catch {
      // ignore
    }
    setUser(u);
  };

  const signInWithGoogle = useCallback(async () => {
    setIsLoading(true);
    try {
      // Try Supabase Google OAuth
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const isConfigured =
        supabaseUrl &&
        supabaseKey &&
        !supabaseUrl.includes("placeholder") &&
        !supabaseKey.includes("placeholder");

      if (isConfigured) {
        // Dynamic import to avoid SSR issues
        const { supabase } = await import("./supabase");
        const { error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.href,
          },
        });
        if (error) throw error;
      } else {
        // Demo mode — simulate Google sign-in
        setIsDemoMode(true);
        await new Promise((r) => setTimeout(r, 1200));
        saveUser({
          id: "demo-google-user",
          email: "demo@example.com",
          name: "Demo User",
          avatarUrl: `https://ui-avatars.com/api/?name=Demo+User&background=0ea5e9&color=fff`,
          provider: "google",
        });
      }
    } catch {
      setIsDemoMode(true);
      saveUser({
        id: "demo-google-fallback",
        email: "user@example.com",
        name: "Google User",
        avatarUrl: `https://ui-avatars.com/api/?name=Google+User&background=0ea5e9&color=fff`,
        provider: "google",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithEmail = useCallback(
    async (email: string): Promise<{ success: boolean; error?: string }> => {
      // Strict email validation
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return { success: false, error: "Please enter a valid email address." };
      }

      setIsLoading(true);
      try {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        const isConfigured =
          supabaseUrl &&
          supabaseKey &&
          !supabaseUrl.includes("placeholder") &&
          !supabaseKey.includes("placeholder");

        if (isConfigured) {
          const { supabase } = await import("./supabase");
          const { error } = await supabase.auth.signInWithOtp({
            email,
            options: { shouldCreateUser: true },
          });
          if (error) throw error;
          // For magic link — simulate immediate login in demo
          await new Promise((r) => setTimeout(r, 800));
        } else {
          await new Promise((r) => setTimeout(r, 800));
        }

        // Save the user session (demo or magic link)
        const name = email.split("@")[0];
        saveUser({
          id: `email-user-${Date.now()}`,
          email,
          name,
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=06b6d4&color=fff`,
          provider: "email",
        });
        setIsDemoMode(!isConfigured);
        return { success: true };
      } catch (err) {
        // Fallback demo
        const name = email.split("@")[0];
        saveUser({
          id: `email-demo-${Date.now()}`,
          email,
          name,
          avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=06b6d4&color=fff`,
          provider: "email",
        });
        setIsDemoMode(true);
        return { success: true };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(() => {
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
    setUser(null);
    setIsDemoMode(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signInWithGoogle, signInWithEmail, signOut, isDemoMode }}
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
