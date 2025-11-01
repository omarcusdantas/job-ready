import { useCompletion } from "@ai-sdk/react";
import { toast } from "sonner";

export function useFeedback({ onFinish }: Readonly<{ onFinish: () => void }>) {
  const {
    completion: feedback,
    setCompletion: setFeedback,
    isLoading: isGeneratingFeedback,
    complete,
  } = useCompletion({
    api: "/api/feedbacks",
    onFinish: onFinish,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function generateFeedback(questionId: string, answer: string) {
    complete(answer.trim(), { body: { questionId } });
  }

  return { feedback, setFeedback, isGeneratingFeedback, generateFeedback };
}
