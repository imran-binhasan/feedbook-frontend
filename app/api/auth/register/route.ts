import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/libs/api/backend";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const regRes = await fetchBackend("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!regRes.ok) {
    const body = await regRes.json().catch(() => ({ error: { message: "Registration failed" } }));
    return NextResponse.json(
      { message: body.error?.message ?? "Registration failed" },
      { status: regRes.status },
    );
  }

  const logRes = await fetchBackend("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email: body.email, password: body.password }),
  });

  if (!logRes.ok) {
    return NextResponse.json(
      { message: "Account created. Please log in." },
      { status: 200 },
    );
  }

  const wrapper = await logRes.json();
  const { user, session } = wrapper.data;

  const response = NextResponse.json({ user, sessionExpiresAt: session.expiresAt });
  response.cookies.set("session_token", session.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 24 * 60 * 60,
  });

  return response;
}
