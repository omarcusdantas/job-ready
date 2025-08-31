import { revalidateTag } from "next/cache";

export function getJobsTag() {
  return "jobs" as const;
}

export function revalidateJobsCache() {
  revalidateTag(getJobsTag());
}
