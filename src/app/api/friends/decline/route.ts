import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { friendId } = body;

    if (!friendId) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const existingFriendRequest = await db.friend.findFirst({
      where: {
        OR: [
          { user1Id: currentUser.id, user2Id: friendId },
          { user1Id: friendId, user2Id: currentUser.id },
        ],
        AND: {
          status: "ACCEPTED",
        },
      },
    });

    if (existingFriendRequest) {
      return new NextResponse(
        "Friend request already sent or already friends",
        {
          status: 400,
        }
      );
    }

    const newFriend = await db.friend.delete({
      where: {
        user1Id_user2Id: {
          user1Id: friendId,
          user2Id: currentUser.id,
        },
      },
    });

    return NextResponse.json(newFriend);
  } catch (e) {
    console.error(e, "ADD_FRIEND_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
