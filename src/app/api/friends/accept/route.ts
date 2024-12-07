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
        user1Id: friendId,
        user2Id: currentUser.id,
        status: "PENDING",
      },
    });

    if (!existingRequest) {
      return new NextResponse("Friend request not found", { status: 404 });
    }

    const newFriend = await db.friend.update({
      where: {
        user1Id_user2Id: {
          user1Id: friendId,
          user2Id: currentUser.id,
        },
      },
      data: { status: "ACCEPTED" },
      include: { user1: true, user2: true },
    });

    const frds = [newFriend.user1, newFriend.user2];
    console.log(
      "Broadcasting accepted event to:",
      frds.map((frd) => frd.id)
    );

    frds.map((frd) => {
      if (frd.id) {
        pusherServer.trigger(frd.id, "request:accepted", newFriend);
      }
    });

    return NextResponse.json(newFriend);
  } catch (e) {
    console.error(e, "ADD_FRIEND_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
