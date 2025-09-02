import z from "zod";
import { experienceLevels } from "@/drizzle/schema";

export const jobSchema = z.object({
  name: z.string().min(1, "Required"),
  experienceLevel: z.enum(experienceLevels),
  description: z.string().min(1, "Required"),
});
