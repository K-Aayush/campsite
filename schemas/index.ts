import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be string" })
    .email({ message: "Email is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }), // we dont' have to put min(8)
  //  cuz password criteria may change, so we don't
  // use min(8), for regiser it is fine
  // as we have new criteria everytime
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be string" })
    .email({ message: "Email is required" }),
  password: z.string().min(6, {
    message: "Minimum amount of letter is 8",
  }),
  // we dont' have to put min(8)
  //  cuz password criteria may change, so we don't
  // use min(8), for regiser it is fine
  // as we have new criteria everytime
  name: z.string().min(3, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z
    .string({ invalid_type_error: "Must be string" })
    .email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum password length is 6",
  }),
});
