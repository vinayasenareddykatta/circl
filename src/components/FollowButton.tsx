"use client";

import { useToast } from "@/hooks/use-toast";
import { FollowerInfo } from "@/lib/types";
import { Button } from "./ui/button";
import useFollowerInfo from "@/hooks/useFollowerInfo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import kyInstance from "@/lib/ky";

interface FollowButtonProps {
  userId: string;
  initialState: FollowerInfo;
}

export default function FollowButton({
  userId,
  initialState,
}: FollowButtonProps) {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data } = useFollowerInfo(userId, initialState);

  const queryKey = ["follower-info", userId];

  const { mutate } = useMutation({
    mutationFn: () =>
      data.isFollowedByUser
        ? kyInstance.delete(`/api/users/${userId}/followers`)
        : kyInstance.post(`/api/users/${userId}/followers`),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });
      const previousState = queryClient.getQueryData<FollowerInfo>(queryKey);
      queryClient.setQueryData<FollowerInfo>(queryKey, () => ({
        followers:
          (previousState?.followers || 0) +
          (previousState?.isFollowedByUser ? -1 : 1),
        isFollowedByUser: !previousState?.isFollowedByUser,
      }));
      return previousState;
    },

    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, (context)?.previousState);
      console.error(error);
      toast({
        description: "Failed to follow/unfollow user, please try again",
        variant: "destructive",
      });
    },
  });

  return (
    <Button
      size="sm"
      variant={data?.isFollowedByUser ? "secondary" : "default"}
      onClick={() => mutate()}
      className="min-w-[80px]"
    >
      {data.isFollowedByUser ? "Unfollow" : "Follow"}
    </Button>
  );
}
