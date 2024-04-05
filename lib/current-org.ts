import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import Org from "@/models/organization";
import type { Organization } from "@/types";

export const currentOrg = async () => {
  try {
    const allCookies = cookies().getAll();
    const token = allCookies.filter((cookie) => cookie.name === "token")[0].value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (!decoded || !decoded.id) return null;

    const org: Organization | null = await Org.findById(decoded.id);

    return org;
  } catch (error) {
    return null;
  }
};
