import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/libs/api/backend";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  if (token) {
    await fetchBackend("/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => {});
  }

  const response = NextResponse.json(null, { status: 204 });
  response.cookies.set("session_token", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });
  return response;
}
