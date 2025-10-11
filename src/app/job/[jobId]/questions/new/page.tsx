import { notFound } from "next/navigation";
import { isJobIdValid } from "@/features/jobs/services";
import { Question } from "@/features/questions/components/Question";

export default async function NewQuestionPage({ params }: Readonly<{ params: Promise<{ jobId: string }> }>) {
  const { jobId } = await params;
  if (!(await isJobIdValid(jobId))) return notFound();

  return <Question jobId={jobId} />;
}
