import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

interface route {
  conversationId: string;
}

export async function DELETE(req: Request, { params }: { params: route }) {
  try {
    const currentUser = await getCurrentUser();

    // Ensure the current user is authenticated
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { conversationId } = params; // Fixed: no need for `await` here
    console.log("Deleting conversation with ID:", conversationId);

    // Check if the conversation exists
    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    // If the conversation doesn't exist, return an error
    if (!existingConversation) {
      return new NextResponse("Invalid Id", { status: 400 });
    }

    // Ensure the current user is part of the conversation before deleting
    const deletedConversation = await db.conversation.delete({
      where: {
        id: conversationId,
      },
      // Adding a check to ensure the current user is part of the conversation
      include: {
        users: {
          where: {
            id: currentUser.id,
          },
        },
      },
    });

    // Return the deleted conversation (optional, just for confirmation)
    console.log("Deleted conversation:", deletedConversation);
    return NextResponse.json(deletedConversation);
  } catch (err) {
    console.log(err, "ERROR_DELETE_CONVERSATION");
    return new NextResponse("Internal Error", { status: 500 });
  }
}
