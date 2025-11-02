import { LoadingButton } from "@/components/ui/loading-button";
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
          <LoadingButton size="sm" onClick={() => requestQuestion(difficulty)} isLoading={isLoading} key={difficulty}>
            {formatQuestionDifficulty(difficulty)}
          </LoadingButton>
        ))
      ) : (
        <>
          <LoadingButton size="sm" variant="outline" onClick={reset} isLoading={isLoading}>
            {status === "pending-answer" ? "Skip" : "New question"}
          </LoadingButton>
          <LoadingButton size="sm" onClick={requestFeedback} disabled={shouldDisableAnswerButton} isLoading={isLoading}>
            Answer
          </LoadingButton>
        </>
      )}
    </div>
  );
}
