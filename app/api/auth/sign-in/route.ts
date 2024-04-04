import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import Org from "@/models/organization";
import { connectToDB } from "@/lib/mongoose";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password) {
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

    const org = await Org.findOne({ email }).select("+password");
    if (!org) {
      return new NextResponse("Organization with this email doesn't exists", { status: 400 });
    }

    const isValidPassword = await bcrypt.compare(password, org.password);
    if (!isValidPassword) {
      return new NextResponse("Invalid password", { status: 400 });
    }

    const token = jwt.sign({ id: org._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    cookies().set("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({ message: "Signed in successfully" }, { status: 201 });
  } catch (error) {
    console.log("AUTH_SIGN_IN", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
