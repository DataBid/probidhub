import * as z from "zod";

export const companySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
  trade: z.string().min(2, "Trade must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  area_code: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  notes: z.string().optional(),
  company_type: z.enum(['subcontractor', 'supplier', 'owner', 'architect', 'engineer']),
});

export type CompanyFormValues = z.infer<typeof companySchema>;

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

export const trades = [
  "Electrical",
  "Plumbing",
  "HVAC",
  "Carpentry",
  "Masonry",
  "Painting",
  "Roofing",
  "Landscaping",
] as const;