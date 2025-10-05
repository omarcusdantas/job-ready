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
    <div className="flex gap-2">
      {status !== "pending-answer" ? (
        questionDifficulties.map((difficulty) => (
          <Button size="sm" onClick={() => requestQuestion(difficulty)} disabled={isLoading} key={difficulty}>
            <LoadingSwap isLoading={isLoading}>{formatQuestionDifficulty(difficulty)}</LoadingSwap>
          </Button>
        ))
      ) : (
        <>
          <Button size="sm" variant="outline" onClick={reset} disabled={isLoading}>
            <LoadingSwap isLoading={isLoading}>Skip</LoadingSwap>
          </Button>
          <Button size="sm" onClick={requestFeedback} disabled={shouldDisableAnswerButton}>
            <LoadingSwap isLoading={isLoading}>Answer</LoadingSwap>
          </Button>
        </>
      )}
    </div>
  );
}
