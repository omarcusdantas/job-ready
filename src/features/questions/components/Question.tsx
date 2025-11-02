"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BackLink } from "@/components/BackLink";
import { QuestionsTable } from "@/drizzle/schema";
import { QuestionContainer } from "./QuestionContainer";
import { QuestionControls } from "./QuestionControls";
import { useFeedback } from "../hooks/useFeedback";
import { useQuestion } from "../hooks/useQuestion";
import { QuestionStatus } from "../utils";

export function Question({
  jobId,
  question,
}: Readonly<{ jobId: string; question?: typeof QuestionsTable.$inferSelect }>) {
  const [answer, setAnswer] = useState<string>("");
  const [status, setStatus] = useState<QuestionStatus>(() => {
    if (question) return "pending-answer";
    return "init";
  });
  const router = useRouter();

  const { questionText, setQuestionText, questionId, isGeneratingQuestion, generateQuestion } = useQuestion({
    jobId,
    initialQuestionText: question?.text,
    initialId: question?.id,
    onFinish: () => setStatus("pending-answer"),
  });

  const { feedback, setFeedback, isGeneratingFeedback, generateFeedback } = useFeedback({
    onFinish: () => setStatus("pending-difficulty"),
  });

  function requestFeedback() {
    if (!questionId || answer.trim() === "") return;
    generateFeedback(questionId, answer);
  }

  function reset() {
    router.push(`/job/${jobId}/questions/new`);
    setStatus("init");
    setQuestionText("");
    setAnswer("");
    setFeedback("");
  }

  return (
    <>
      <div className="container mt-4 flex items-center justify-between gap-4">
        <div className="flex-grow basis-0">
          <BackLink href={`/job/${jobId}/questions`}>Questions</BackLink>
        </div>
        <QuestionControls
          shouldDisableAnswerButton={!questionId || answer.trim() === "" || status !== "pending-answer"}
          status={status}
          isLoading={isGeneratingQuestion || isGeneratingFeedback}
          requestQuestion={generateQuestion}
          requestFeedback={requestFeedback}
          reset={reset}
        />
        <div className="hidden flex-grow md:block" />
      </div>
      <QuestionContainer
        question={questionText}
        answer={answer}
        feedback={feedback}
        status={status}
        setAnswer={setAnswer}
      />
    </>
  );
}
