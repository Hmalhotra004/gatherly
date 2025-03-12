import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { friendId } = body;

    if (!friendId) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const existingRequest = await db.friend.findFirst({
      where: {
        user1Id: currentUser.id,
        user2Id: friendId,
        status: "PENDING",
      },
    });

    if (!existingRequest) {
      return new NextResponse("Friend request not found", { status: 404 });
    }

    const newFriend = await db.friend.update({
      where: {
        user1Id_user2Id: {
          user1Id: currentUser.id,
          user2Id: friendId,
        },
      },
      data: { status: "ACCEPTED" },
      include: { user1: true, user2: true },
    });

    await pusherServer.trigger(
      currentUser.id,
      "request:accepted",
      newFriend.user2
    );

    await pusherServer.trigger(
      currentUser.id,
      "request:declined",
      newFriend.user2Id
    );

    await pusherServer.trigger(
      newFriend.user2Id,
      "request:accepted",
      currentUser
    );

    return NextResponse.json(newFriend);
  } catch (e) {
    console.error(e, "ADD_FRIEND_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
