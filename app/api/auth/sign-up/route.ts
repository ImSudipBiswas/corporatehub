import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import Org from "@/models/organization";
import { connectToDB } from "@/lib/mongoose";

export async function POST(req: Request) {
  const { email, name, password, image } = await req.json();
  if (!email || !name || !password) {
    return new NextResponse("All fields are necessary", { status: 400 });
  }

  if (password.length < 6) {
    return new NextResponse("Password must be at least 6 characters long", {
      status: 400,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new NextResponse("Invalid email", { status: 400 });
  }

  try {
    await connectToDB();

    const existingOrg = await Org.findOne({ email });
    if (existingOrg) {
      return new NextResponse("Organization with this email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const org = new Org({ email, name, image, password: hashedPassword });
    await org.save();

    const token = jwt.sign({ id: org._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    cookies().set("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json(
      { message: "Organization created successfully", org },
      { status: 201 }
    );
  } catch (error) {
    console.log("AUTH_SIGN_UP", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
