import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { signUpSchema } from "@/lib/utils";

export async function POST(req: Request) {
  const reqBody = await req.json();

  const validated = signUpSchema.safeParse(reqBody);
  if (!validated.success) {
    return new NextResponse("Invalid data", { status: 400 });
  }

  const { name, image, email, password } = validated.data;

  try {
    const existingOrg = await db.organization.findUnique({ where: { email } });
    if (existingOrg) {
      return new NextResponse("Organization with this email already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const org = await db.organization.create({
      data: {
        name,
        image,
        email,
        password: hashedPassword,
      },
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
