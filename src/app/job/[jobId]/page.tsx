import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobById } from "@/features/jobs/services";
import { formatExperienceLevel } from "@/features/jobs/utils";

const jobActions = [
  {
    label: "Practice Questions",
    details: "Test your skills with questions tailored to this job description.",
    href: "questions",
  },
  {
    label: "Enhance Your Resume",
    details: "Get feedback on your resume and improve your chances of getting this job.",
    href: "resume",
  },
  {
    label: "Edit Job Details",
    details: "Use this option for small adjustments to this job description.",
    href: "edit",
  },
];

export default async function JobPage({ params }: { readonly params: Promise<{ jobId: string }> }) {
  const { jobId } = await params;

  const job = await getJobById(jobId);
  if (!job) return notFound();

  return (
    <div className="container my-4 space-y-4">
      <BackLink href="/">Job Board</BackLink>

      <div className="space-y-6">
        <header className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl">{job.name}</h1>
            <div className="flex gap-2">{formatExperienceLevel(job.experienceLevel)}</div>
          </div>
          <p className="text-muted-foreground line-clamp-3">{job.description}</p>
        </header>

        <div className="grid grid-cols-1 gap-6 has-hover:*:not-hover:opacity-70 lg:grid-cols-2">
          {jobActions.map((option) => (
            <Link
              className="transition-[transform_opacity] hover:scale-[1.02]"
              href={`/job/${jobId}/${option.href}`}
              key={option.href}
            >
              <Card className="flex h-full flex-row items-start justify-between">
                <CardHeader className="flex-grow">
                  <CardTitle>{option.label}</CardTitle>
                  <CardDescription>{option.details}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ArrowRightIcon className="size-6" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
