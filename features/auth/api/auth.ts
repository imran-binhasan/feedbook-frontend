import { apiClient } from "@/libs/api/client";
import type { UserProfile, LoginRequest, RegisterRequest } from "@/features/auth/types/auth";

type LoginResponse = { user: UserProfile; sessionExpiresAt?: string };
type RegisterResponse = { user: UserProfile; sessionExpiresAt?: string } | { message: string };

export function loginApi(data: LoginRequest) {
  return apiClient<LoginResponse>("/api/auth/login", {
    method: "POST",
    body: data,
  });
}

export function registerApi(data: RegisterRequest) {
  return apiClient<RegisterResponse>("/api/auth/register", {
    method: "POST",
    body: data,
  });
}

export function getMeApi() {
  return apiClient<UserProfile>("/api/v1/users/me");
}

export function logoutApi() {
  return apiClient<void>("/api/auth/logout", { method: "POST" });
}
