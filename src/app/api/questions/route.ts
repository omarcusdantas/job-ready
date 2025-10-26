import z from "zod";
import { questionDifficulties } from "@/drizzle/schema";
import { createQuestionStream } from "@/features/questions/ai/createQuestionStream";

const schema = z.object({
  jobId: z.string().min(1),
  difficulty: z.enum(questionDifficulties),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = schema.safeParse(body);

  if (!parsedBody.success) {
    return new Response("Invalid body", { status: 400 });
  }

  const { jobId, difficulty } = parsedBody.data;
  return createQuestionStream(jobId, difficulty);
}
