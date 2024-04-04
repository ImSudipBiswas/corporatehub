"use client";

import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { SignInFormValues, cn, signInSchema } from "@/lib/utils";

export const SignInModal = () => {
  const { isOpen, type, onClose, onOpen } = useModal();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isModalOpen = isOpen && type === "sign-in";

  const onSubmit = async (values: SignInFormValues) => {
    try {
      await axios.post("/api/auth/sign-in", values);
      toast.success("Signed in successfully");
      window.location.reload();
    } catch (error: AxiosError | any) {
      toast.error(error.response?.data || error.message);
      form.reset();
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const openSignUpModal = () => {
    handleClose();
    onOpen("sign-up");
  };

  const isLoading = form.formState.isSubmitting;

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome back</DialogTitle>
          <DialogDescription>Sign in to your account</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="you@example.com"
                      type="text"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••" type="password" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="flex mt-3 items-center w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </Form>
        <DialogFooter>
          <p
            aria-disabled={isLoading}
            className={cn(
              "cursor-pointer text-sm w-full text-muted-foreground text-justify hover:underline transition",
              isLoading && "pointer-events-none"
            )}
            onClick={openSignUpModal}
          >
            Don&apos;t have an account already? Sign up now
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
