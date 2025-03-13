"use server";
import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { conversationId } = body;

    if (!conversationId) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    const deletedConversation = await db.conversationOnUser.deleteMany({
      where: {
        id: conversationId,
        userId: currentUser.id,
      },
    });

    pusherServer.trigger(
      currentUser.id,
      "conversation:remove",
      existingConversation
    );

    // existingConversation.users.forEach((user) => {
    //   if (user.email) {
    //     pusherServer.trigger(
    //       user.email,
    //       "conversation:remove",
    //       existingConversation
    //     );
    //   }
    // });

    return NextResponse.json(deletedConversation);
  } catch (err) {
    console.error("ERROR_DELETE_CONVERSATION", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { userId, isGroup, members, name } = body;

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse("Invalid Data", { status: 400 });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup: true,
          users: {
            create: [
              ...members.map((member: { value: string; label: string }) => ({
                user: { connect: { id: member.value } },
                isAdmin: false,
              })),
              {
                user: { connect: { id: currentUser.id } },
                isAdmin: true, // Make the creator an admin
              },
            ],
          },
        },
        include: {
          users: {
            include: {
              user: true,
            },
          },
        },
      });

      newConversation.users.forEach(({ user }) => {
        if (user.id) {
          pusherServer.trigger(user.id, "conversation:new", newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversation = await db.conversation.findFirst({
      where: {
        isGroup: false,
        users: {
          every: {
            OR: [{ userId: currentUser.id }, { userId: userId }],
          },
        },
      },
    });

    if (existingConversation) {
      return NextResponse.json(existingConversation);
    }

    const newConversation = await db.conversation.create({
      data: {
        isGroup: false,
        users: {
          create: [
            { user: { connect: { id: currentUser.id } }, isAdmin: false },
            { user: { connect: { id: userId } }, isAdmin: false },
          ],
        },
      },
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });

    newConversation.users.forEach(({ user }) => {
      if (user.id) {
        pusherServer.trigger(user.id, "conversation:new", newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (e) {
    console.error("Error:", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
