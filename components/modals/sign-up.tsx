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
import { FileUpload } from "@/components/file-upload";
import { useModal } from "@/hooks/use-modal-store";
import { type SignUpFormValues, signUpSchema, cn } from "@/lib/utils";
import { login } from "@/actions/auth";

export const SignUpModal = () => {
  const { isOpen, type, onClose, onOpen } = useModal();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      image: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const isModalOpen = isOpen && type === "sign-up";

  const onSubmit = async (values: SignUpFormValues) => {
    try {
      await axios.post("/api/register", values);
      await login(values.email, values.password);
      handleClose();
    } catch (error: AxiosError | any) {
      toast.error(error.response?.data || error.message);
      form.reset();
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const openSignInModal = () => {
    handleClose();
    onOpen("sign-in");
  };

  const isLoading = form.formState.isSubmitting;

  if (!isModalOpen) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Get started</DialogTitle>
          <DialogDescription>Create a new account</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile picture</FormLabel>
                  <FormControl>
                    <FileUpload value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="your name" type="text" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button className="flex items-center w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
              {isLoading ? "Signing up..." : "Sign Up"}
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
            onClick={openSignInModal}
          >
            Already have an account? Sign in now
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
