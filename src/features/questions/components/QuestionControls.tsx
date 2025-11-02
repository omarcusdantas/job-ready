import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { questionDifficulties } from "@/drizzle/schema";
import { formatQuestionDifficulty, QuestionDifficulty, QuestionStatus } from "../utils";

export function QuestionControls({
  shouldDisableAnswerButton,
  status,
  isLoading,
  requestQuestion,
  requestFeedback,
  reset,
}: Readonly<{
  shouldDisableAnswerButton: boolean;
  status: QuestionStatus;
  isLoading: boolean;
  requestQuestion: (difficulty: QuestionDifficulty) => void;
  requestFeedback: () => void;
  reset: () => void;
}>) {
  return (
    <div className="mb-4 flex gap-2">
      {status === "init" ? (
        questionDifficulties.map((difficulty) => (
          <Button size="sm" onClick={() => requestQuestion(difficulty)} disabled={isLoading} key={difficulty}>
            <LoadingSwap isLoading={isLoading}>{formatQuestionDifficulty(difficulty)}</LoadingSwap>
          </Button>
        ))
      ) : (
        <>
          <Button size="sm" variant="outline" onClick={reset} disabled={isLoading}>
            <LoadingSwap isLoading={isLoading}>{status === "pending-answer" ? "Skip" : "New question"}</LoadingSwap>
          </Button>
          <Button size="sm" onClick={requestFeedback} disabled={shouldDisableAnswerButton || isLoading}>
            <LoadingSwap isLoading={isLoading}>Answer</LoadingSwap>
          </Button>
        </>
      )}
    </div>
  );
}
