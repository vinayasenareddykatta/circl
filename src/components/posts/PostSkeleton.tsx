import { Skeleton } from "../ui/skeleton";

function SkeletonPost() {
  return (
    <div className="w-full animate-pulse space-y-3 rounded-md bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="">
          <Skeleton className="h-4 w-20 rounded-md" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
      </div>

      <div className="whitespace-pre-line break-words">
        <Skeleton className="h-6 w-full rounded-md" />
      </div>
    </div>
  );
}

export default function PostSkeleton() {
  return (
    <div className="space-y-3">
      <SkeletonPost />
      <SkeletonPost />
      <SkeletonPost />
      <SkeletonPost />
    </div>
  );
}
