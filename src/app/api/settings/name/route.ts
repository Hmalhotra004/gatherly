"use server";
import getCurrentUser from "@/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id || !currentUser?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();

    const updatedUser = await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.log(err, "ERROR_SETTINGS");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
