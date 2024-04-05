"use client";

import axios from "axios";
import { createContext } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Organization } from "@/types";

type AuthProviderState = {
  organization: Organization | null;
  isAuth: boolean;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthProviderState>({
  organization: null,
  isAuth: false,
  isLoading: true,
});

const fetcher = async () => {
  return (await axios.get<Organization>("/api/auth")).data;
};

export const Authprovider = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["organization"],
    queryFn: fetcher,
  });

  const value = {
    organization: data || null,
    isAuth: !!data,
    isLoading: isLoading && !data,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
