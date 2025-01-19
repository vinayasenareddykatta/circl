import { Prisma } from "@prisma/client";

export const postDataInclude = {
  user: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
} satisfies Prisma.PostInclude; // Ensures the result matches CustomPostInclude structure


export type PostData = Prisma.PostGetPayload<{
    include: typeof postDataInclude
}>