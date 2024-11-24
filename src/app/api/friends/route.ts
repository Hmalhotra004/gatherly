import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();
    const { friendId } = body;

    if (!friendId) {
      return new NextResponse("Missing info", { status: 400 });
    }

    const existingFriend = await db.friend.findFirst({
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

    if (!existingFriend) {
      return new NextResponse(`Friend doesn't exits`, {
        status: 404,
      });
    }

    const friend = await db.friend.deleteMany({
      where: {
        OR: [
          {
            user1Id: friendId,
            user2Id: currentUser.id,
          },
          {
            user1Id: currentUser.id,
            user2Id: friendId,
          },
        ],
      },
    });

    return NextResponse.json(friend);
  } catch (e) {
    console.error(e, "ADD_FRIEND_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

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
          { user1Id: currentUser.id, user2Id: UserFriendRequest.id },
          { user1Id: UserFriendRequest.id, user2Id: currentUser.id },
        ],
      },
    });

    if (existingFriendRequest) {
      return new NextResponse(
        "Friend request already sent or already friends",
        {
          status: 409,
        }
      );
    }

    const newFriend = await db.friend.create({
      data: {
        user2Id: UserFriendRequest.id,
        user1Id: currentUser.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(newFriend);
  } catch (e) {
    console.error(e, "ADD_FRIEND_ERROR");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
