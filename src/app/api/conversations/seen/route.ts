"use server";
import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { pusherServer } from "@/lib/pusher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const body = await req.json();

    const { conversationId } = body;

    if (!conversationId)
      return new NextResponse("No ConversationId", { status: 404 });

    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true,
          },
        },
        users: true,
      },
    });

    if (!conversation) return new NextResponse("Invalid Id", { status: 400 });

    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) return NextResponse.json(conversation);

    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    await pusherServer.trigger(currentUser.id, "conversation:update", {
      id: conversationId,
      messages: [updatedMessage],
    });

    //FIXME: Seen msgs wont work cuz here
    // if (lastMessage.seenIds.indexOf(currentUser.id) !== -1)
    //   return NextResponse.json(conversation);

    await pusherServer.trigger(
      conversationId,
      "message:update",
      updatedMessage
    );

    return NextResponse.json(updatedMessage);
  } catch (err) {
    console.log(err, "ERROR_MESSAGES_SEEN");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
