"use server";

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import Org from "@/models/organization";
import type { Organization } from "@/types";

export const signOut = () => {
  cookies().set("token", "", { maxAge: 0 });
  revalidatePath("/");
};

export const currentOrg = async () => {
  const token = cookies().get("token")?.value;

  if (!token) return null;

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
  if (!decoded || !decoded.id) return null;

  const org: Organization | null = await Org.findById(decoded.id);

  return org;
};
