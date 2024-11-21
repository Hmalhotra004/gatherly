"use server";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

function generateDiscriminator() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export async function POST(req: NextRequest) {
  try {
    const { email, name, password } = await req.json();

    if (!name || !email || !password)
      return new NextResponse("missing info", { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
        discriminator: generateDiscriminator(),
      },
    });
    return NextResponse.json(user);
  } catch (err) {
    console.log("REGISTRATION_ERROR", err);
    return new NextResponse("error creating user", { status: 500 });
  }
}
