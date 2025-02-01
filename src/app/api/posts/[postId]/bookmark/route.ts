import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    const params = await context.params;
    const { postId } = params;
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauhorized" }, { status: 401 });
    }

    const bookmark = await prisma.bookmark.findUnique({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId,
        },
      },
    });

    const data = {
      isBookmarkedByUser: !!bookmark,
    };
    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal seerver error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    const params = await context.params;
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.bookmark.upsert({
      where: {
        userId_postId: {
          userId: loggedInUser.id,
          postId: params.postId,
        },
      },
      create: {
        userId: loggedInUser.id,
        postId: params.postId,
      },
      update: {},
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ postId: string }> },
) {
  try {
    const params = await context.params;
    const { user: loggedInUser } = await validateRequest();

    if (!loggedInUser) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.bookmark.deleteMany({
      where: {
        userId: loggedInUser.id,
        postId: params.postId,
      },
    });

    return new Response();
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
