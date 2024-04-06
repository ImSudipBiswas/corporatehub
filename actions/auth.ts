"use server";

import { signIn, signOut } from "@/auth";

export const login = async (email: string, password: string) => {
  await signIn("credentials", { email, password });
  return;
};

export const logout = async () => {
  await signOut();
  return;
};
