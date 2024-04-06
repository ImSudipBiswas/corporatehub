import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatSalary = (min: number, max: number) => {
  if (min && max) {
    return `$${min / 1000}k - $${max / 1000}k`;
  } else if (min && !max) {
    return `$${min / 1000}k`;
  }
};

export const signUpSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(3, "Name must be at least 3 characters"),
  image: z.optional(z.string()),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address")
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

export const jobSchema = z
  .object({
    title: z
      .string({ required_error: "Name is required" })
      .min(3, "Name must be at least 3 characters"),
    description: z
      .string({ required_error: "Description is required" })
      .min(10, "Description must be at least 10 characters"),
    location: z.string({ required_error: "Location is required" }),
    organizationId: z.string({ required_error: "Organization is required" }),
    minSalary: z.number({ required_error: "Minimum salary is required" }),
    maxSalary: z.number({ required_error: "Maximum salary is required" }),
    deadline: z.string({ required_error: "Deadline is required." }),
  })
  .refine((data) => data.maxSalary > data.minSalary, {
    message: "Maximum salary must be greater than minimum salary",
    path: ["maxSalary"],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type SignInFormValues = z.infer<typeof signInSchema>;
export type JobFormValues = z.infer<typeof jobSchema>;
