"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";

export default function SearchField() {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();

    if (!q) return;
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <Input name="q" type="text" placeholder="Search..." className="pe-10" />
        <Button
          type="submit"
          variant="ghost"
          className="absolute right-0 top-1/2 -translate-y-1/2 transform rounded-none text-muted-foreground hover:bg-transparent"
        >
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
