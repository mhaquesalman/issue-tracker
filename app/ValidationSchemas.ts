import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65535),
  status: z.string().default("OPEN"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, " Minimum 4 characters")
    .max(8, "Maximum 8 characters"),
  email: z.string().min(8, "Email is required"),
  password: z.string().min(6, "Password is required"),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65535)
    .optional(),
  assignedToUserId: z.number().optional().nullable(),
});
