
import { z } from "zod";

export const providerFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  specialization: z.string().min(1, "Please select a specialization"),
  licenseNumber: z.string().min(1, "License number is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  practice: z.string().min(2, "Practice name must be at least 2 characters"),
});

export type ProviderFormValues = z.infer<typeof providerFormSchema>;
