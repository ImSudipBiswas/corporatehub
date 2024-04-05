import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import Org from "@/models/organization";
import type { Organization } from "@/types";
import { connectToDB } from "@/lib/mongoose";

export async function GET(req: Request) {
  try {
    await connectToDB();
    const token = cookies().get("token")?.value;

    if (!token) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!decoded || !decoded.id) {
      cookies().set("token", "", { expires: new Date(0) });
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const org: Organization | null = await Org.findById(decoded.id);

    return NextResponse.json(org, { status: 200 });
  } catch (error) {
    console.log("AUTH", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
