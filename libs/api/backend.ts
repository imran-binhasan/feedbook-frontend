const BASE = process.env.BACKEND_URL || "http://localhost:4000/api/v1";

export function backendUrl(path: string): string {
  return `${BASE}${path}`;
}

export function fetchBackend(path: string, options: RequestInit = {}) {
  return fetch(backendUrl(path), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string>),
    },
  });
}
