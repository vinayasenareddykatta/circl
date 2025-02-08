import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import SearchResults from "./SearchResults";

export async function generateMetadata(context: {
  searchParams: Promise<{ q: string }>;
}): Promise<Metadata> {
  const params = await context.searchParams;

  return {
    title: `Search results for "${params?.q}"`,
  };
}

export default async function SearchPage(context: {
  searchParams: Promise<{ q: string }>;
}) {
  const params = await context.searchParams;

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="line-clamp-2 break-all text-center text-2xl font-bold">
            Search results for &quot;{params?.q}&quot;
          </h1>
        </div>
        <SearchResults query={params?.q} />
      </div>
      <TrendsSidebar />
    </main>
  );
}
