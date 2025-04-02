import { z } from 'zod';

export const JobTitleSchema = z.string()
  .min(1, { message: "Job title cannot be empty" })
  .max(50, { message: "Job title cannot exceed 50 characters" })
  .trim()
  .regex(/^[a-zA-Z\s\/-]+$/, { message: "Job title can only contain letters, spaces, hyphens, and forward slashes" });