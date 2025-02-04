"use client";

import { PostData } from "@/lib/types";
import Link from "next/link";
import React from "react";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import PostMoreButton from "./PostMoreButton";
import Linkify from "../Linkify";

import PostGallery from "./PostGallery";
import LikeButton from "./LikeButton";
import BookmarkButton from "./BookmarkButton";
import { MessageSquare } from "lucide-react";
import Comments from "../comments/Comments";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();

  const [showComments, setShowComments] = React.useState(false);

  return (
    <article className="group space-y-0 rounded-md border bg-card shadow-sm">
      <div className="flex items-start justify-between p-4">
        <div className="flex flex-wrap gap-2">
          <Link href={`/users/${post.user.username}`}>
            <UserAvatar avatarUrl={post.user.avatarUrl} />
          </Link>
          <div className="">
            <Link
              href={`/users/${post.user.username}`}
              className="block font-medium capitalize hover:underline"
            >
              {post.user.displayName}
            </Link>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.userId === user.id && (
          <PostMoreButton post={post} className="group-hover:opacity:100" />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words px-4 pb-2">
          {post.content}
        </div>
      </Linkify>
      {!!post.attachments.length && (
        <PostGallery attachments={post.attachments} />
      )}
      <hr className="h-1/3" />
      <div className="flex items-center justify-between px-2 py-1">
        <div className="flex items-center gap-3">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some(
                ({ userId }) => userId === user.id,
              ),
            }}
          />
          <CommentsButton
            post={post}
            onclick={() => setShowComments(!showComments)}
          />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              ({ userId }) => userId === user.id,
            ),
          }}
        />
      </div>
      {showComments && <Comments post={post} />}
    </article>
  );
}

interface CommentsButtonProps {
  post: PostData;
  onclick: () => void;
}

function CommentsButton({ post, onclick }: CommentsButtonProps) {
  return (
    <button onClick={onclick} className="flex items-center gap-2 text-primary">
      <MessageSquare />
      <span className="tabular-nums">{post._count.comments} Comments</span>
    </button>
  );
}
