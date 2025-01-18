import React from "react";
import Image from "next/image";

import avatarPlaceholder from "@/assets/images/avatar.png"
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

export default function UserAvatar({
  avatarUrl,
  size = 48,
  className,
}: UserAvatarProps) {
  return (
    <Image
      src={avatarUrl || avatarPlaceholder}
      alt="user avatar"
      className={cn(
        "h-fir aspect-square flex-none rounded-full bg-secondary object-cover",
        className,
      )}
      width={size}
      height={size}
    />
  );
}
