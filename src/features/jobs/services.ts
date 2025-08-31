import { unstable_cacheTag as cacheTag } from "next/cache";
import { desc } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { JobsTable } from "@/drizzle/schema";
import { getJobsTag } from "@/features/jobs/cacheTags";

export async function getJobs() {
  "use cache";
  cacheTag(getJobsTag());

  return db.query.JobsTable.findMany({
    orderBy: desc(JobsTable.updatedAt),
  });
}
