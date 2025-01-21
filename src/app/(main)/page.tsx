import PostEditor from "@/components/posts/editor/PostEditor";

import TrendsSidebar from "@/components/TrendsSidebar";

import FeedsForYou from "./FeedsForYou";

export default async function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <FeedsForYou />
      </div>
      <TrendsSidebar />
    </main>
  );
}
