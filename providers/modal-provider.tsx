"use client";

import * as React from "react";

import { SignInModal } from "@/components/modals/sign-in";
import { SignUpModal } from "@/components/modals/sign-up";
import { SignOutModal } from "@/components/modals/sign-out";
import { AddJobModal } from "@/components/modals/add-job";
import { JobModal } from "@/components/modals/job";
import { DeleteJobModal } from "@/components/modals/delete-job";
import { UpdateJobModal } from "@/components/modals/update-job";

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
      <SignOutModal />
      <AddJobModal />
      <JobModal />
      <DeleteJobModal />
      <UpdateJobModal />
    </>
  );
};
