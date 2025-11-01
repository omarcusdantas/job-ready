import z from "zod";
import { generateFeedbackStream } from "@/features/questions/ai/generateFeedbackStream";

const schema = z.object({
  prompt: z.string().min(1),
  questionId: z.string().min(1),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsedBody = schema.safeParse(body);

  if (!parsedBody.success) return new Response("Invalid body", { status: 400 });

  const { prompt: answer, questionId } = parsedBody.data;
  return generateFeedbackStream(questionId, answer);
}
