import Link from "next/link";
import { ArrowRightIcon, PlusIcon } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getQuestionsPreviewsByJobId } from "@/features/questions/services";
import { formatQuestionDifficulty } from "@/features/questions/utils";

export default async function QuestionsPage({ params }: Readonly<{ params: Promise<{ jobId: string }> }>) {
  const { jobId } = await params;
  const questions = await getQuestionsPreviewsByJobId(jobId);

  return (
    <div className="container my-4 space-y-4">
      <BackLink href={`/job/${jobId}`}>Job</BackLink>

      <div className="mb-6 flex justify-between gap-2">
        <h2 className="text-3xl md:text-4xl">Select a Question</h2>
        <Button asChild>
          <Link href={`/job/${jobId}/questions/new`}>
            <PlusIcon />
            Create Question
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 has-hover:*:not-hover:opacity-70 lg:grid-cols-2">
        {questions.map((question) => (
          <Link
            className="transition-[transform_opacity] hover:scale-[1.02]"
            href={`/job/${jobId}/questions/${question.id}`}
            key={question.id}
          >
            <Card className="flex h-full gap-1 py-4">
              <CardHeader className="px-4">
                <CardTitle className="text-md/6">{question.preview}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between px-4">
                <Badge variant="outline">{formatQuestionDifficulty(question.difficulty)}</Badge>
                <ArrowRightIcon className="size-6" />
              </CardContent>
            </Card>
          </Link>
        ))}

        <Link className="transition-opacity" href={`/job/${jobId}/questions/new`}>
          <Card className="hover:border-primary/70 flex h-full items-center justify-center border-3 border-dotted bg-transparent shadow-none transition-colors">
            <div className="flex items-center gap-2">
              <PlusIcon className="size-4" />
              New Question
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
