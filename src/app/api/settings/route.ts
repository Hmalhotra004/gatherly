"use server";
import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const updatedUser = await db.user.delete({
      where: {
        id: currentUser.id,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.log(err, "ERROR_USER");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
