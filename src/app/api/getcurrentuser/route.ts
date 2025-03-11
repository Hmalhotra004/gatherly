"use server";
import getSession from "@/actions/getSession";
import db from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getSession();

    if (!session?.user?.email)
      return new NextResponse("Unauthorized", { status: 401 });

    const currentUser = await db.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) return new NextResponse("Unauthorized", { status: 401 });

    if (!currentUser.discriminator || !currentUser.id || !currentUser.email)
      return new NextResponse("Missing Info", { status: 404 });

    return currentUser;
  } catch (err) {
    console.error(err);
    return new NextResponse("error getting user", { status: 500 });
  }
}
