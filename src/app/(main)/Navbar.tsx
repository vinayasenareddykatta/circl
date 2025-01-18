import SearchField from "@/components/SearchField";
import UserButton from "@/components/UserButton";
import { Network } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-4xl font-bold text-blue-700"
        >
          <Network /> Circl
        </Link>
        <SearchField />
        <UserButton className="ms-auto" />
      </div>
    </header>
  );
}
