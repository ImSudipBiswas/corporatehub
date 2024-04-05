import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import Org from "@/models/organization";
import type { Organization } from "@/types";

export const currentOrg = async () => {
  try {
    const token = cookies().get("token")?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!decoded || !decoded.id) return null;

    const org: Organization | null = await Org.findById(decoded.id);

    return org;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch current organization");
  }
};
