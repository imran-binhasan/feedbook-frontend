import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/libs/api/backend";

export async function POST(request: NextRequest) {
  const { remember, ...body } = await request.json();

  const res = await fetchBackend("/auth/login", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: { message: "Invalid email or password" } }));
    return NextResponse.json(
      { message: body.error?.message ?? "Invalid email or password" },
      { status: res.status },
    );
  }

  const wrapper = await res.json();
  const { user, session } = wrapper.data;

  const response = NextResponse.json({ user, sessionExpiresAt: session.expiresAt });
  response.cookies.set("session_token", session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60,
  });

  return response;
}
