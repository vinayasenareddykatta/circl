import { Metadata } from "next";
import Image from "next/image";
import signup from "@/assets/images/signup.png";
import { SITE } from "@/lib/constants";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
export const metadata: Metadata = {
  title: "Signup",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-20">
      <div className="flex h-full max-h-[40rem] w-full max-w-[64rem] overflow-hidden rounded-md border bg-card shadow-sm">
        <div className="w-full items-center space-y-10 overflow-auto p-10 md:w-1/2">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Sign up to Circl</h1>
            <p className="text-sm text-muted-foreground">{SITE.description}</p>
          </div>
          <div className="space-y-5">
            <SignUpForm />
            <Link href="/login" className="block text-center hover:underline">
              Already have an account? Log in
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
