import { createUIMessageStream, createUIMessageStreamResponse } from "ai";
import { getJobById } from "@/features/jobs/services";
import { generateQuestionStream } from "./generateQuestionStream";
import { createQuestion, getQuestionsByJobId } from "../services";
import { QuestionDifficulty } from "../utils";

export async function createQuestionStream(jobId: string, difficulty: QuestionDifficulty) {
  const previousQuestions = await getQuestionsByJobId(jobId);

  const job = await getJobById(jobId);
  if (!job) {
    return new Response("Job not found", { status: 404 });
  }

  const stream = createUIMessageStream({
    execute: ({ writer }) => {
      const result = generateQuestionStream({
        previousQuestions,
        difficulty,
        job,
        onFinish: async (question) => {
          const questionId = await createQuestion({ jobId, text: question, difficulty });
          writer.write({
            type: "data-questionId",
            data: { questionId: questionId },
            transient: true,
          });
        },
      });
      writer.merge(result.toUIMessageStream());
    },
  });

  return createUIMessageStreamResponse({ stream });
}
