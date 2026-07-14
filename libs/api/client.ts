export class ApiError extends Error {
  status: number;
  payload: unknown;

  constructor(status: number, payload: unknown) {
    const message = extractMessage(payload) ?? `Request failed with status ${status}`;
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
  }
}

function extractMessage(payload: unknown): string | undefined {
  if (typeof payload !== "object" || payload === null) return;
  const err = (payload as Record<string, unknown>).error;
  if (typeof err === "object" && err !== null && "message" in err) {
    const msg = (err as Record<string, unknown>).message;
    if (typeof msg === "string") return msg;
  }
  if ("message" in (payload as Record<string, unknown>)) {
    const msg = (payload as Record<string, unknown>).message;
    if (typeof msg === "string") return msg;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

const TIMEOUT_MS = 15_000;

export type PaginatedApiResult<T> = {
  items: T[];
  pagination: { nextCursor: string | null; hasMore: boolean };
};

export async function apiClient<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const timeoutController = new AbortController();
  const timeout = setTimeout(() => timeoutController.abort(), TIMEOUT_MS);
  const signal = options.signal
    ? AbortSignal.any([options.signal, timeoutController.signal])
    : timeoutController.signal;

  let response: Response;
  try {
    response = await fetch(path, {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal,
    });
  } catch (err: unknown) {
    const isTimeout = err instanceof DOMException && err.name === "AbortError" && timeoutController.signal.aborted;
    clearTimeout(timeout);
    if (isTimeout) {
      throw new ApiError(0, { error: { message: "Request timed out. Please check your connection and try again." } });
    }
    throw new ApiError(0, { error: { message: "Unable to connect. Please check your connection and try again." } });
  }

  clearTimeout(timeout);

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

  const body = await response.json();

  if (typeof body === "object" && body !== null && body.success === true && "data" in body) {
    if (body.meta?.pagination) {
      return {
        items: body.data,
        pagination: body.meta.pagination,
      } as T;
    }
    return body.data as T;
  }

  return body as T;
}
