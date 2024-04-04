import { Organization } from "@/types";

export const auth = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL!}/api/auth`);
    if (!response.ok) return null;
    const data = await response.json();
    return data as Organization;
  } catch (error) {
    console.log("CHECK_AUTH", error);
    return null;
  }
};
