import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { JobsTable } from "@/drizzle/schema";
import { cacheJobById, cacheJobs, revalidateJobCacheById, revalidateJobsCache } from "@/features/jobs/cacheTags";

export async function getJobs() {
  "use cache";
  cacheJobs();

  return db.query.JobsTable.findMany({
    columns: {
      id: true,
      name: true,
      experienceLevel: true,
    },
    orderBy: desc(JobsTable.updatedAt),
  });
}

export async function getJobById(id: string) {
  "use cache";
  cacheJobById(id);

  return db.query.JobsTable.findFirst({
    where: eq(JobsTable.id, id),
  });
}

export async function createJob(job: typeof JobsTable.$inferInsert) {
  const [newJob] = await db.insert(JobsTable).values(job).returning({ id: JobsTable.id });

  revalidateJobsCache();

  return newJob.id;
}

export async function updateJob(id: string, job: Partial<typeof JobsTable.$inferInsert>) {
  await db.update(JobsTable).set(job).where(eq(JobsTable.id, id));
  revalidateJobsCache();
  revalidateJobCacheById(id);
}

export async function isJobIdValid(id: string) {
  const job = await db.query.JobsTable.findFirst({
    where: eq(JobsTable.id, id),
    columns: { id: true },
  });

  return !!job;
}
