"use client";

import { useMemo, useState } from "react";
import { useCompletion, UseCompletionHelpers } from "@ai-sdk/react";
import { toast } from "sonner";
import { BackLink } from "@/components/BackLink";
import { QuestionContainer } from "./QuestionContainer";
import { QuestionControls } from "./QuestionControls";
import { QuestionDifficulty, QuestionStatus } from "../utils";

interface UseCompletionData<T> extends UseCompletionHelpers {
  data?: T[];
}

export function Question({ jobId }: Readonly<{ jobId: string }>) {
  const [answer, setAnswer] = useState<string>("");
  const [status, setStatus] = useState<QuestionStatus>("init");

  const {
    completion: question,
    setCompletion: setQuestion,
    isLoading: isGeneratingQuestion,
    complete: generateQuestion,
    data,
  }: UseCompletionData<{ questionId: string }> = useCompletion({
    api: "/api/questions",
    onFinish: () => {
      setStatus("pending-answer");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    completion: feedback,
    setCompletion: setFeedback,
    isLoading: isGeneratingFeedback,
    complete: generateFeedback,
  } = useCompletion({
    api: "/api/questions/feedback",
    onFinish: () => {
      setStatus("pending-difficulty");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const questionId = useMemo(() => {
    const item = data?.at(-1);
    if (!item) return null;

    return item.questionId;
  }, [data]);

  function requestQuestion(difficulty: QuestionDifficulty) {
    setQuestion("");
    setFeedback("");
    setAnswer("");
    generateQuestion(difficulty, { body: { jobId } });
  }

  function requestFeedback() {
    if (questionId === null || answer.trim() === "") return;
    generateFeedback(answer?.trim(), { body: { questionId } });
  }

  function reset() {
    setStatus("init");
    setQuestion("");
    setFeedback("");
    setAnswer("");
  }

  return (
    <div>
      <div className="container mt-4 flex items-center justify-between gap-4">
        <div className="flex-grow basis-0">
          <BackLink href={`/job/${jobId}/questions`}>Questions</BackLink>
        </div>
        <QuestionControls
          shouldDisableAnswerButton={questionId === null || answer.trim() === ""}
          status={status}
          isLoading={isGeneratingQuestion || isGeneratingFeedback}
          requestQuestion={requestQuestion}
          requestFeedback={requestFeedback}
          reset={reset}
        />
        <div className="hidden flex-grow md:block" />
      </div>
      <QuestionContainer
        question={question}
        answer={answer}
        feedback={feedback}
        status={status}
        setAnswer={setAnswer}
      />
    </div>
  );
}
