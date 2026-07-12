import { z } from "zod";

const emailSchema = z
  .string()
  .min(1, "Email is required.")
  .email("Please enter a valid email address.");

const passwordSchema = z
  .string()
  .min(1, "Password is required.")
  .min(8, "Password must be at least 8 characters long.")
  .max(64, "Password must be at most 64 characters long.")
  .refine((value) => /[a-z]/.test(value), {
    message: "Password must include at least one lowercase letter.",
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must include at least one uppercase letter.",
  })
  .refine((value) => /\d/.test(value), {
    message: "Password must include at least one number.",
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  remember: z.boolean(),
});

export type LoginValues = z.infer<typeof loginSchema>;

const nameSchema = z
  .string()
  .min(1, "This field is required.")
  .max(50, "Must be at most 50 characters long.")
  .regex(/^[\p{L}\s'-]+$/u, "Only letters, spaces, hyphens, and apostrophes are allowed.");

export const registerSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password."),
    terms: z
      .boolean()
      .refine((value) => value === true, {
        message: "You must agree to the terms & conditions.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type RegisterValues = z.infer<typeof registerSchema>;