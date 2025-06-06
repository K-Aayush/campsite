import * as z from "zod";
export type ServiceFormValues = z.infer<typeof serviceSchema>;

export const serviceSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z
    .string()
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
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
});
