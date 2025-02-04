import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { getCommentDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    const params = await context.params;
    const { postId } = params;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauhorized" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
      include: getCommentDataInclude(loggedInUser.id),
      orderBy: { createdAt: "desc" },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });
    //   todo
    const previousCursor = comments.length > pageSize ? comments[0].id : null;

    const data = {
      comments: comments.length > pageSize ? comments.slice(1) : comments,
      previousCursor,
    };
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal seerver error" }, { status: 500 });
  }
}
