"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "sonner";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-right"
        expand
        visibleToasts={3}
        toastOptions={{
          style: {
            fontFamily: "var(--font-sans)",
            fontSize: "14px",
            fontWeight: 500,
            padding: "12px 16px",
            borderRadius: "8px",
            gap: "8px",
            background: "var(--card)",
            color: "var(--card-foreground)",
            border: "1px solid var(--border-soft)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
