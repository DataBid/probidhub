import * as z from "zod";

export const subcontractorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  trade: z.string().min(2, "Trade must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
});

export type SubcontractorFormValues = z.infer<typeof subcontractorSchema>;