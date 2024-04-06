"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

interface AuthProviderProps extends SessionProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children, ...props }: AuthProviderProps) => {
  return <SessionProvider {...props}>{children}</SessionProvider>;
};
