import { useEffect, useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { toast } from "sonner";
import z from "zod";
import { QuestionDifficulty } from "../utils";

const schema = z.object({
  questionId: z.string().min(1),
});

export function useQuestion({ jobId, onFinish }: Readonly<{ jobId: string; onFinish: () => void }>) {
  const [questionId, setQuestionId] = useState<string | null>(null);
  const [question, setQuestion] = useState<string>("");

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
    if (questionStatus === "submitted") return;

    const lastAssistantMessage = questionMessages.findLast((m) => m.role === "assistant");
    const question = lastAssistantMessage?.parts.find((p) => p.type === "text")?.text;

    setQuestion(question ?? "");
  }, [questionMessages]);

  function generateQuestion(difficulty: QuestionDifficulty) {
    sendMessage({ text: difficulty });
  }

  const isGeneratingQuestion = useMemo(() => {
    return questionStatus === "submitted" || questionStatus === "streaming";
  }, [questionStatus]);

  return { questionId, question, setQuestion, isGeneratingQuestion, generateQuestion };
}
