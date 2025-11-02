import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import z from "zod";
import { QuestionDifficulty } from "../utils";

const schema = z.object({
  questionId: z.string().min(1),
});

export function useQuestion({
  jobId,
  initialQuestionText,
  initialId,
  onFinish,
}: Readonly<{ jobId: string; initialQuestionText?: string; initialId?: string; onFinish: () => void }>) {
  const [questionId, setQuestionId] = useState<string | null>(() => initialId || null);
  const [questionText, setQuestionText] = useState<string>(() => initialQuestionText || "");

  const {
    messages: questionMessages,
    status: questionStatus,
    sendMessage,
  } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/questions",
      prepareSendMessagesRequest({ messages }) {
        const lastMessage = messages.at(-1);
        const textMessage = lastMessage?.parts.find((p) => p.type === "text");
        return { body: { difficulty: textMessage?.text, jobId } };
      },
    }),
    onData: (dataPart) => {
      if (dataPart.type !== "data-questionId") return;

      const parsedData = schema.safeParse(dataPart.data);
      if (!parsedData.success) return;

      setQuestionId(parsedData.data.questionId);
    },
    onFinish: onFinish,
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (questionStatus === "submitted" || questionStatus === "ready") return;

    const lastAssistantMessage = questionMessages.findLast((m) => m.role === "assistant");
    const question = lastAssistantMessage?.parts.find((p) => p.type === "text")?.text;

    setQuestionText(question ?? "");
  }, [questionMessages]);

  function generateQuestion(difficulty: QuestionDifficulty) {
    sendMessage({ text: difficulty });
  }

  const isGeneratingQuestion = useMemo(() => {
    return questionStatus === "submitted" || questionStatus === "streaming";
  }, [questionStatus]);

  return { questionId, questionText, setQuestionText, isGeneratingQuestion, generateQuestion };
}
