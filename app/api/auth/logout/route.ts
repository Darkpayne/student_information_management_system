// app/api/logout/route.ts
import { NextResponse } from "next/server";
import { logout } from "@/lib/authStore";

export async function GET() {
  logout();
  return NextResponse.json({ message: "User Logged Out successfully" });
}