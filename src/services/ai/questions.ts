import { ModelMessage, streamText } from "ai";
import { JobsTable, QuestionsTable } from "@/drizzle/schema";
import { QuestionDifficulty } from "@/features/questions/utils";
import { geminiModel } from "./models/gemini";

export function generateQuestion({
  previousQuestions,
  difficulty,
  job,
  onFinish,
}: {
  previousQuestions: Pick<typeof QuestionsTable.$inferSelect, "text" | "difficulty">[];
  difficulty: QuestionDifficulty;
  job: Pick<typeof JobsTable.$inferSelect, "name" | "description" | "experienceLevel">;
  onFinish: (question: string) => void;
}) {
  const previousMessages = previousQuestions.flatMap(
    (question) =>
      [
        { role: "user", content: question.difficulty },
        { role: "assistant", content: question.text },
      ] satisfies ModelMessage[]
  );

  return streamText({
    model: geminiModel,
    onFinish: ({ text }) => onFinish(text),
    messages: [
      ...previousMessages,
      {
        role: "user",
        content: difficulty,
      },
    ],
    system: `You are an AI assistant that creates realistic, job-specific technical interview questions.
Your task: Generate **one** technical interview question tailored to the following job details. A difficulty level of "easy", "medium", or "hard" is provided by the user and should be used to tailor the question.

Job Information:
- Description: ${job.description}
- Experience Level: ${job.experienceLevel}
${job.name ? `- Title: ${job.name}` : ""}

You must follow these guidelines:
- Base the question on the skills, technologies, or responsibilities mentioned in the job description.
- Ensure the question difficulty matches both the job's experience level and the provided difficulty.
- Prefer real-world, practical challenges over theoretical or trivia-style questions.
- The question may focus on one relevant skill or technology if appropriate.
- It is ok to ask a question about just a single part of the job description, such as a specific technology or skill (e.g., if the job description is for a Next.js, Drizzle, and TypeScript developer, you can ask a TypeScript only question).
- Format the question clearly in **Markdown**, with code snippets or bullet points when relevant.
- Output **only the question**. No explanations, answers, or extra commentary, stop generating output as soon you have provided the full question.`,
  });
}
