import { z } from "zod";

export type ServiceFormValues = z.infer<typeof serviceSchema>;
export type ScheduleFormValues = z.infer<typeof scheduleSchema>;

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

export const serviceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 0, {
      message: "Price must be a positive number",
    }),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  isBookable: z.boolean(),
  depositPercentage: z.string().refine(
    (val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 100;
    },
    {
      message: "Deposit percentage must be between 0 and 100",
    }
  ),
  category: z.string().optional(),
  maxCapacity: z.string().refine(
    (val) => {
      const num = parseInt(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Max capacity must be a positive number",
    }
  ),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const scheduleSchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  maxCapacity: z.string().refine(
    (val) => {
      const num = parseInt(val);
      return !isNaN(num) && num > 0;
    },
    {
      message: "Max capacity must be a positive number",
    }
  ),
});
