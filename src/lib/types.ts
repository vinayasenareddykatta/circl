import { Prisma } from "@prisma/client";

export const userDataSelect = {
  id: true,
  username: true,
  displayName: true,
  avatarUrl: true,
} satisfies Prisma.UserSelect;

export const postDataInclude = {
  user: {
    select: userDataSelect,
  },
} satisfies Prisma.PostInclude; // Ensures the result matches CustomPostInclude structure

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataInclude;
}>;
