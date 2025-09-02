import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

const jobsTag = "jobs";

function getJobTagById(id: string) {
  return `${jobsTag}:${id}`;
}

export function cacheJobs() {
  cacheTag(jobsTag);
}

export function cacheJobById(id: string) {
  cacheTag(getJobTagById(id));
}

export function revalidateJobsCache() {
  revalidateTag(jobsTag);
}

export function revalidateJobById(id: string) {
  revalidateTag(getJobTagById(id));
}
