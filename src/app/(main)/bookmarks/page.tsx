import { Metadata } from "next";
import Bookmarks from "./Bookmarks";
import TrendsSidebar from "@/components/TrendsSidebar";

export const metadata: Metadata = { title: "Bookmarks" };

export default function BookmarkPage() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-2">
        <div className="rounded-sm bg-card p-4 shadow-sm">
          <h1 className="text-center text-xl font-bold">Bookmarks</h1>
        </div>
        <Bookmarks />
      </div>
      <TrendsSidebar />
    </main>
  );
}
