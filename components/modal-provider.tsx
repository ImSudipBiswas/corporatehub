"use client";

import * as React from "react";

import { SignInModal } from "@/components/modals/sign-in";
import { SignUpModal } from "@/components/modals/sign-up";

export const ModalProvider = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <SignInModal />
      <SignUpModal />
    </>
  );
};
