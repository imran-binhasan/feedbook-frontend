import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/libs/api/backend";

export async function GET(request: NextRequest) {
  return proxy(request);
}

export async function POST(request: NextRequest) {
  return proxy(request);
}

export async function PATCH(request: NextRequest) {
  return proxy(request);
}

export async function DELETE(request: NextRequest) {
  return proxy(request);
}

async function proxy(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  const { pathname, search } = request.nextUrl;

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const contentType = request.headers.get("content-type");
  if (contentType) headers["Content-Type"] = contentType;

  const body = ["POST", "PATCH"].includes(request.method) ? await request.text() : undefined;

  let res: Response;
  try {
    res = await fetch(`${backendUrl(pathname.replace("/api/v1", ""))}${search}`, {
      method: request.method,
      headers,
      body,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: { message: "Backend unreachable" } },
      { status: 502 },
    );
  }

  if (res.status === 204) {
    return new NextResponse(null, { status: 204 });
  }

  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
  });
}
