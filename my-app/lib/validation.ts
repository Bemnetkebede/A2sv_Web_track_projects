import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  role: z.enum(["user", "admin"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});

export const verifyEmailSchema = z.object({
  email: z.string().email("Invalid email"),
  OTP: z.string().length(6, "OTP must be 6 digits"),
});
