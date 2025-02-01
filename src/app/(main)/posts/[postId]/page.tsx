import { validateRequest } from "@/auth";
import FollowButton from "@/components/FollowButton";
import Linkify from "@/components/Linkify";
import Post from "@/components/posts/Post";
import UserAvatar from "@/components/UserAvatar";
import prisma from "@/lib/prisma";
import { getPostDataInclude, UserData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { cache, Suspense } from "react";

interface PageProps {
  params: Promise<{ postId: string }>;
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(loggedInUserId),
  });

  if (!post) notFound();

  return post;
});

// export async function generateMetaData({ params: { postId } }: PageProps) {
export async function generateMetadata(context: {
  params: Promise<{ postId: string }>;
}): Promise<Metadata> {
  const params = await context.params;
  const { postId } = params;
  const { user } = await validateRequest();
  if (!user) return {};

  const post = await getPost(postId, user.id);
  return {
    title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const { postId } = resolvedParams;
  const { user } = await validateRequest();

  if (!user) {
    return <p className="">You are not authorized to view this page.</p>;
  }

  const post = await getPost(postId, user.id);

  return (
    <main className="flex w-full min-w-0 ">
      <div className="w-full">
        <Post post={post} />
      </div>
      <div className="sticky hidden h-fit w-64 flex-none overflow-hidden rounded-md border md:block">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <UserInfoSidebar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
}
interface UserInfoSidebarProps {
  user: UserData;
}

async function UserInfoSidebar({ user }: UserInfoSidebarProps) {
  const { user: loggedInUser } = await validateRequest();
  console.log(user);
  if (!loggedInUser) return null;

  return (
    <div className="borde space-y-3 rounded-sm bg-card p-5 shadow-sm">
      <div className="text-xl font-bold">About this user</div>

      <Link
        href={`/users/${user.username}`}
        className="flex items-center gap-3"
      >
        <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
        <div>
          <p className="line-clamp-1 break-all font-semibold hover:underline">
            {user.displayName}
          </p>
          <p className="line-clamp-1 break-all text-muted-foreground">
            @{user.username}
          </p>
        </div>
      </Link>

      <Linkify>
        <div className="line-clamp-6 whitespace-pre-line break-words text-muted-foreground">
          {user.bio}
        </div>
      </Linkify>
      {user.id !== loggedInUser.id && (
        <FollowButton
          userId={user.id}
          initialState={{
            followers: user._count.followers,
            isFollowedByUser: user.followers.some(
              ({ followerId }) => followerId === loggedInUser.id,
            ),
          }}
        />
      )}
    </div>
  );
}
