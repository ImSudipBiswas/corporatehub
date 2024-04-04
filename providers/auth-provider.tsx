"use client";

import { createContext, useEffect, useState } from "react";

import { Organization } from "@/types";
import { auth } from "@/lib/auth";

type AuthProviderState = {
  organization: Organization | null;
  isAuth: boolean;
};

export const AuthContext = createContext<AuthProviderState>({ organization: null, isAuth: false });

export const Authprovider = ({ children }: { children: React.ReactNode }) => {
  const [organization, setOrganization] = useState<Organization | null>(null);

  useEffect(() => {
    auth().then((org) => setOrganization(org));
  }, []);

  const value = {
    organization,
    isAuth: !!organization,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
