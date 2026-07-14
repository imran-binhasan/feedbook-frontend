import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/libs/api/backend";

export async function POST(request: NextRequest) {
  const body = await request.json();

  let regRes: Response;
  try {
    regRes = await fetchBackend("/auth/register", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to connect to the server. Please try again later." },
      { status: 502 },
    );
  }

  if (!regRes.ok) {
    const data = await regRes.json().catch(() => ({ error: { message: "Registration failed" } }));
    return NextResponse.json(
      { message: data.error?.message ?? "Registration failed" },
      { status: regRes.status },
    );
  }

  let logRes: Response;
  try {
    logRes = await fetchBackend("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email: body.email, password: body.password }),
    });
  } catch {
    return NextResponse.json(
      { message: "Account created, but we couldn't sign you in. Please try logging in manually." },
      { status: 200 },
    );
  }

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
