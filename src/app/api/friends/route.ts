import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { name, code } = body;

    if (!name || !code) {
      return new NextResponse("Missing info", { status: 400 });
    }

    if (name === currentUser.name && code === currentUser.discriminator) {
      return new NextResponse("Cannot add yourself as a friend", {
        status: 400,
      });
    }

    const UserFriendRequest = await db.user.findUnique({
      where: {
        name_discriminator: {
          name,
          discriminator: code,
        },
      },
    });

    if (!UserFriendRequest)
      return new NextResponse("User not found", { status: 404 });

    const existingFriendRequest = await db.friend.findFirst({
      where: {
        OR: [
          { userId: currentUser.id, friendId: UserFriendRequest.id },
          { userId: UserFriendRequest.id, friendId: currentUser.id },
        ],
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

    const newFriend = await db.friend.create({
      data: {
        userId: currentUser.id,
        friendId: UserFriendRequest.id,
        status: "ACCEPTED",
      },
    });

    return NextResponse.json(newFriend);
  } catch (e) {
    console.error(e, "ADD_FRIEND_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
