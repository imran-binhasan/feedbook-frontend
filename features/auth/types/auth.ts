export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: UserProfile | null;
  sessionExpiresAt?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
