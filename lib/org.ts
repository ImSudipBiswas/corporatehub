import { auth } from "@/auth";
import { db } from "./db";

export const currentOrg = async () => {
  try {
    const session = await auth();
    if (!session?.user?.email) return null;

    return await db.organization.findUnique({ where: { email: session.user.email } });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findOrgById = async (id: string) => {
  try {
    return await db.organization.findUnique({ where: { id } });
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const findOrgByEmail = async (email: string) => {
  try {
    return await db.organization.findUnique({ where: { email } });
  } catch (error) {
    console.log(error);
    return null;
  }
};
