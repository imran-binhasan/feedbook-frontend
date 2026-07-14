import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/libs/api/backend";

export async function POST(request: NextRequest) {
  const { remember, ...body } = await request.json();

  let res: Response;
  try {
    res = await fetchBackend("/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json(
      { message: "Unable to connect to the server. Please try again later." },
      { status: 502 },
    );
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({ error: { message: "Invalid email or password" } }));
    return NextResponse.json(
      { message: data.error?.message ?? "Invalid email or password" },
      { status: res.status },
    );
  }

  const wrapper = await res.json();
  const { user, session } = wrapper.data;

  const response = NextResponse.json({ user, sessionExpiresAt: session.expiresAt });
  response.cookies.set("session_token", session.token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: remember ? 7 * 24 * 60 * 60 : 24 * 60 * 60,
  });

  return response;
}
