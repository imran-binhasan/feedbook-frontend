import { NextRequest, NextResponse } from "next/server";
import { fetchBackend } from "@/libs/api/backend";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await fetchBackend("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    if (res.status === 401) {
      const response = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
      response.cookies.set("session_token", "", { httpOnly: true, path: "/", maxAge: 0 });
      return response;
    }
    const body = await res.json().catch(() => ({ error: { message: "Request failed" } }));
    return NextResponse.json(
      { message: body.error?.message ?? "Request failed" },
      { status: res.status },
    );
  }

  const wrapper = await res.json();
  return NextResponse.json(wrapper.data);
}
