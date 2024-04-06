import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";

import { signInSchema } from "@/lib/utils";
import { findOrgByEmail } from "@/lib/org";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validated = signInSchema.safeParse(credentials);
        if (validated.success) {
          const { email, password } = validated.data;
          
          const user = await findOrgByEmail(email);
          if (!user || !user.password) return null;

          const match = await bcrypt.compare(password, user.password);
          if (match) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
