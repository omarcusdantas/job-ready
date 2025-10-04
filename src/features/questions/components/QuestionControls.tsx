import { Button } from "@/components/ui/button";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { questionDifficulties } from "@/drizzle/schema";
import { QuestionStatus } from "../utils";
import { formatQuestionDifficulty, QuestionDifficulty } from "../utils";

export function QuestionControls({
  shouldDisableAnswerButton,
  status,
  isLoading,
  generateQuestion,
  generateFeedback,
  reset,
}: Readonly<{
  shouldDisableAnswerButton: boolean;
  status: QuestionStatus;
  isLoading: boolean;
  generateQuestion: (difficulty: QuestionDifficulty) => void;
  generateFeedback: () => void;
  reset: () => void;
}>) {
  return (
    <div className="flex gap-2">
      {status !== "pending-answer" ? (
        questionDifficulties.map((difficulty) => (
          <Button size="sm" onClick={() => generateQuestion(difficulty)} disabled={isLoading} key={difficulty}>
            <LoadingSwap isLoading={isLoading}>{formatQuestionDifficulty(difficulty)}</LoadingSwap>
          </Button>
        ))
      ) : (
        <>
          <Button size="sm" variant="outline" onClick={reset} disabled={isLoading}>
            <LoadingSwap isLoading={isLoading}>Skip</LoadingSwap>
          </Button>
          <Button size="sm" onClick={generateFeedback} disabled={shouldDisableAnswerButton}>
            <LoadingSwap isLoading={isLoading}>Answer</LoadingSwap>
          </Button>
        </>
      )}
    </div>
  );
}
