"use server";

import { redirect } from "next/navigation";
import z from "zod";
import { jobSchema } from "./schemas";
import { createJob, isJobIdValid, updateJob } from "./services";

export async function createJobAction(unsafeData: z.infer<typeof jobSchema>) {
  const { success, data } = jobSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "Invalid job data",
    };
  }

  const newJobId = await createJob(data);
  redirect(`/job/${newJobId}`);
}

export async function updateJobAction(id: string, unsafeData: z.infer<typeof jobSchema>) {
  const { success, data } = jobSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: true,
      message: "Invalid job data",
    };
  }

  const existingJob = await isJobIdValid(id);
  if (!existingJob) {
    return {
      error: true,
      message: "Job not found",
    };
  }

  await updateJob(id, data);
  redirect(`/job/${id}`);
}
