
import { z } from "zod";

export const basicInfoSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactPerson: z.string().min(2, "Contact person name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
});

export const companyDetailsSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  size: z.string().min(1, "Please select company size"),
  country: z.string().min(1, "Please select a country"),
  region: z.string().min(1, "Please select a state/region"),
});

export type BasicInfo = z.infer<typeof basicInfoSchema>;
export type CompanyDetails = z.infer<typeof companyDetailsSchema>;

export const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Manufacturing",
  "Retail",
  "Construction",
  "Transportation",
  "Entertainment",
  "Other"
] as const;

export const staffSizes = [
  "2-50",
  "51-100",
  "101-200",
  "201-500",
  "Above 500"
] as const;

export const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
] as const;

export const statesByCountry: { [key: string]: string[] } = {
  "United States": [
    "California",
    "New York",
    "Texas",
    "Florida",
  ],
  "Canada": [
    "Ontario",
    "Quebec",
    "British Columbia",
  ],
  "United Kingdom": [
    "England",
    "Scotland",
    "Wales",
    "Northern Ireland"
  ],
  "Australia": [
    "New South Wales",
    "Victoria",
    "Queensland",
  ]
};
