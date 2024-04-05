"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export const signOut = () => {
  cookies().set("token", "", { maxAge: 0 });
  revalidatePath("/");
};
