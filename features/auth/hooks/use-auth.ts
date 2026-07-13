"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginApi, registerApi, getMeApi, logoutApi } from "@/features/auth/api/auth";
import { useAuthStore } from "@/features/auth/store/auth";
import type { LoginRequest, RegisterRequest } from "@/features/auth/types/auth";

export function useLogin() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (data: LoginRequest) => loginApi(data),
    onSuccess: (response) => {
      setUser(response.user, "sessionExpiresAt" in response ? response.sessionExpiresAt : undefined);
      toast.success("Welcome back!");
      router.push("/feed");
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Invalid email or password");
    },
  });
}

export function useRegister() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (data: RegisterRequest) => registerApi(data),
    onSuccess: (response) => {
      if ("user" in response) {
        setUser(response.user, "sessionExpiresAt" in response ? response.sessionExpiresAt : undefined);
        toast.success("Account created successfully!");
        router.push("/feed");
      } else {
        toast.info(response.message);
      }
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Registration failed");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return useMutation({
    mutationFn: () => logoutApi(),
    onSettled: () => {
      clearAuth();
      queryClient.clear();
      router.replace("/login");
    },
  });
}

export function useCurrentUser() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMeApi,
    enabled: user !== null,
    retry: false,
  });
}
