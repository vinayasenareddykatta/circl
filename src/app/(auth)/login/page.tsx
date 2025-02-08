import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import signup from "@/assets/images/signup.png";
import LoginForm from "./LoginForm";
import { SITE } from "@/lib/constants";
import GoogleSignInButton from "./google/GoogleSigninButton";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage() {
  return (
    <main className="flex h-screen items-center justify-center p-20">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-md border bg-card shadow-sm">
        <div className="w-full items-center space-y-10 overflow-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to Circl</h1>
            <p className="text-sm text-muted-foreground">{SITE.description}</p>
          </div>
          <div className="space-y-5">
            <GoogleSignInButton/>
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted"/>
              <span>OR</span>
              <div className="h-px flex-1 bg-muted"/>
            </div>
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>

        <Image
          src={signup}
          alt="logo"
          className="hidden w-1/2 bg-slate-100 object-contain md:block"
        />
      </div>
    </main>
  );
}
