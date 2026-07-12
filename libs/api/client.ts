export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(status: number, payload: unknown) {
    super(
      typeof payload === "object" &&
        payload !== null &&
        "message" in payload &&
        typeof (payload as { message: string }).message === "string"
        ? (payload as { message: string }).message
        : `Request failed with status ${status}`,
    );
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

const TIMEOUT_MS = 15_000;

export async function apiClient<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const timeoutController = new AbortController();
  const timeout = setTimeout(() => timeoutController.abort(), TIMEOUT_MS);
  const signal = options.signal
    ? AbortSignal.any([options.signal, timeoutController.signal])
    : timeoutController.signal;

  try {
    const response = await fetch(path, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal,
    });

    if (!response.ok) {
      let payload: unknown;
      try {
        payload = await response.json();
      } catch {
        payload = { message: response.statusText };
      }
      throw new ApiError(response.status, payload);
    }

    if (response.status === 204) return undefined as T;

    return response.json() as Promise<T>;
  } finally {
    clearTimeout(timeout);
  }
}
