import Link from "next/link";
import { Suspense } from "react";
import { ArrowRightIcon, Loader2Icon, PlusIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobs } from "@/features/jobs/services";
import { formatExperienceLevel } from "@/features/jobs/utils";

export default function AppPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen-header flex items-center justify-center">
          <Loader2Icon className="size-24 animate-spin" />
        </div>
      }
    >
      <Jobs />
    </Suspense>
  );
}

async function Jobs() {
  const jobs = await getJobs();

  return (
    <div className="container my-4">
      <div className="mb-6 flex justify-between gap-2">
        <h1 className="text-3xl md:text-4xl lg:text-5xl">Select a job posting</h1>
        <Button asChild>
          <Link href="/job/new">
            <PlusIcon />
            Create Job Posting
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 has-hover:*:not-hover:opacity-70 lg:grid-cols-2">
        {jobs.map((job) => (
          <Link className="transition-[transform_opacity] hover:scale-[1.02]" href={`/job/${job.id}`} key={job.id}>
            <Card className="h-full">
              <div className="flex h-full items-center justify-between">
                <div className="h-full space-y-4">
                  <CardHeader>
                    <CardTitle className="text-lg">{job.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground line-clamp-3">{job.description}</CardContent>
                  <CardFooter className="flex gap-2">
                    <Badge variant="outline">{formatExperienceLevel(job.experienceLevel)}</Badge>
                  </CardFooter>
                </div>
                <CardContent>
                  <ArrowRightIcon className="size-6" />
                </CardContent>
              </div>
            </Card>
          </Link>
        ))}

        <Link className="transition-opacity" href="/job/new">
          <Card className="hover:border-primary/70 flex h-full items-center justify-center border-3 border-dotted bg-transparent shadow-none transition-colors">
            <div className="flex items-center gap-2 text-lg">
              <PlusIcon className="size-6" />
              New Job Posting
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
