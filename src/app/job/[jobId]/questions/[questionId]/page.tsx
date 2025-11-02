import { notFound } from "next/navigation";
import { Question } from "@/features/questions/components/Question";
import { getQuestionById } from "@/features/questions/services";

export default async function QuestionPage({
  params,
}: Readonly<{ params: Promise<{ jobId: string; questionId: string }> }>) {
  const { jobId, questionId } = await params;

  const question = await getQuestionById(questionId);
  if (question?.jobId !== jobId) return notFound();

  return <Question jobId={jobId} question={question} />;
}
