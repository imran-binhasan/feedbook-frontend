import { NextRequest, NextResponse } from "next/server";
import { backendUrl } from "@/libs/api/backend";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();

  const res = await fetch(backendUrl("/uploads/images"), {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: form,
  });

  const data = await res.text();
  return new NextResponse(data, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
