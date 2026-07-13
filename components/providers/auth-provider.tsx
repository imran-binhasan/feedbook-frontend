"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthStore } from "@/features/auth/store/auth";
import { getMeApi } from "@/features/auth/api/auth";

const WARN_BEFORE_MS = 60 * 60 * 1000;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useAuthStore((s) => s.setUser);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const warned = useRef(false);

  useEffect(() => {
    let cancelled = false;

    getMeApi()
      .then((user) => {
        if (!cancelled) {
          setUser(user);
        }
      })
      .catch(() => {
        if (!cancelled) {
          clearAuth();
          if (pathname !== "/login" && pathname !== "/register") {
            toast.error("Session expired. Please log in again.");
            router.replace("/login");
          }
        }
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });

    return () => {
      cancelled = true;
    };
  }, [setUser, clearAuth, router, pathname]);

  useEffect(() => {
    if (!ready || warned.current) return;

    const expiresAt = useAuthStore.getState().sessionExpiresAt;
    if (!expiresAt) return;

    const remaining = new Date(expiresAt).getTime() - Date.now();
    if (remaining <= 0) {
      clearAuth();
      if (pathname !== "/login" && pathname !== "/register") {
        router.replace("/login");
      }
      return;
    }

    if (remaining <= WARN_BEFORE_MS) {
      warned.current = true;
      toast.warning("Your session is about to expire. Please log in again.");
    }
  }, [ready, clearAuth, router, pathname]);

  const handleFocus = useCallback(() => {
    const expiresAt = useAuthStore.getState().sessionExpiresAt;
    if (!expiresAt) return;
    if (pathname !== "/login" && pathname !== "/register" && new Date(expiresAt).getTime() - Date.now() <= 0) {
      clearAuth();
      router.replace("/login");
    }
  }, [clearAuth, router, pathname]);

  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, [handleFocus]);

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <div className="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
