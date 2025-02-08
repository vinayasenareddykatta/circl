import { google } from "@/auth";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const state = generateState(); // Creates a random string for CSRF protection
  const codeVerifier = generateCodeVerifier(); // Creates a random string for PKCE

  const url = google.createAuthorizationURL(state, codeVerifier, 
    ["profile", "email"] // Define the scopes you need
  );
  // Securely store state and code_verifier in cookies
  const cookieStore = await cookies();
  cookieStore.set("state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 600, // 10 minutes
    sameSite: "lax",
  });
  cookieStore.set("code_verifier", codeVerifier, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 600, // 10 minutes
    sameSite: "lax",
  });

  return NextResponse.redirect(url);
}
