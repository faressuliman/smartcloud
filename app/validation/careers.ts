import { z } from "zod";

export const careersTextFieldsSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

export const careersSchema = careersTextFieldsSchema.extend({
  cv: z.instanceof(File, { message: "CV/Security Clearance is required" }),
});

export type CareersFormData = z.infer<typeof careersSchema>;
