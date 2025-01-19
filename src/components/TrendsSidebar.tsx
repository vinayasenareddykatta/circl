import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { userDataSelect } from "@/lib/types";
import Link from "next/link";
import React, { Suspense } from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";

import { formatNumber } from "@/lib/utils";

export default function TrendsSidebar() {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 rounded-md md:block">
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
}

async function WhoToFollow() {
  const { user } = await validateRequest();
  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: userDataSelect,
    take: 5,
  });

  return (
    <div className="space-y-5 rounded-md border bg-card p-5 shadow-sm">
      <div className="text-xl font-semibold">Who to follow</div>
      <div className="space-y-5">
        {usersToFollow.map((user) => {
          return (
            <div
              key={user.id}
              className="flex items-center justify-between gap-3"
            >
              <Link
                href={`/users/${user.username}`}
                className="flex items-center gap-3"
              >
                <UserAvatar
                  avatarUrl={user.avatarUrl}
                  className="flex-none"
                  size={32}
                />
                <div className="">
                  <p className="line-clamp-1 break-all text-xs font-semibold capitalize hover:underline">
                    {user.displayName}
                  </p>
                  <p className="line-clamp-1 break-all text-xs lowercase text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </Link>
              <Button size={"sm"}>Follow</Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const getTrendingTopics = unstable_cache(
  async () => {
    const result = await prisma.$queryRaw<{ hashtag: string; count: bigint }[]>`
          SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count
          FROM posts
          GROUP BY (hashtag)
          ORDER BY count DESC, hashtag ASC
          LIMIT 50
      `;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending_topics"],
  {
    revalidate: 2 * 60 * 60, // 2 hours
  },
);

async function TrendingTopics() {
  const topics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-md border bg-card p-5 shadow-sm">
      <div className="text-xl font-semibold">Trending topics</div>
      <div className="flex flex-wrap gap-3">
        {topics.map(({ hashtag, count }) => {
          const title = hashtag.split("#")[1];
          return (
            <Link
              href={`/hashtag/${title}`}
              className="flex items-center space-x-2 rounded-md border p-1 px-2 text-xs hover:underline"
              key={hashtag}
            >
              <span>{hashtag}</span>
              <span className="text-[10px] text-muted-foreground">
                {formatNumber(count)} {count === 1 ? "post" : "posts"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}