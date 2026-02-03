import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  vesselType: z.string().min(2, "Vessel type is required"),
  serviceCategory: z.string().min(1, "Please select a service category"),
  requirements: z.string().min(10, "Please describe your requirements in detail (at least 10 characters)"),
});

export type ConsultationFormData = z.infer<typeof consultationSchema>;
