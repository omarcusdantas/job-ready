import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { Card, CardContent } from "@/components/ui/card";
import { JobForm } from "@/features/jobs/components/JobForm";
import { getJobById } from "@/features/jobs/services";

export default async function JobEditPage({ params }: Readonly<{ params: Promise<{ jobId: string }> }>) {
  const { jobId } = await params;

  return (
    <div className="container my-4 max-w-5xl space-y-4">
      <BackLink href={`/job/${jobId}`}>Job Posting</BackLink>
      <h2 className="text-3xl md:text-4xl">Edit Job Details</h2>
      <Card>
        <CardContent>
          <Suspense fallback={<Loader2 className="mx-auto size-24 animate-spin" />}>
            <SuspendedJobForm jobId={jobId} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}

export async function SuspendedJobForm({ jobId }: Readonly<{ jobId: string }>) {
  const job = await getJobById(jobId);
  if (!job) return notFound();

  return <JobForm job={job} />;
}
