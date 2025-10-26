import "server-only";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/drizzle/db";
import { QuestionsTable } from "@/drizzle/schema";
import {
  cacheQuestionsPreviewsByJobId,
  revalidateQuestionsCacheByJobId,
  revalidateQuestionsPreviewsCacheByJobId,
} from "@/features/questions/cacheTags";

export async function getQuestionsPreviewsByJobId(jobId: string) {
  "use cache";
  cacheQuestionsPreviewsByJobId(jobId);

  return db
    .select({
      id: QuestionsTable.id,
      difficulty: QuestionsTable.difficulty,
      preview: sql<string>`SUBSTRING(${QuestionsTable.text}, 1, 70)`,
    })
    .from(QuestionsTable)
    .where(eq(QuestionsTable.jobId, jobId))
    .orderBy(desc(QuestionsTable.updatedAt));
}

export async function getQuestionsByJobId(jobId: string) {
  "use cache";
  cacheQuestionsPreviewsByJobId(jobId);

  return db
    .select({
      id: QuestionsTable.id,
      difficulty: QuestionsTable.difficulty,
      text: QuestionsTable.text,
    })
    .from(QuestionsTable)
    .where(eq(QuestionsTable.jobId, jobId))
    .orderBy(desc(QuestionsTable.updatedAt));
}

export async function createQuestion(question: typeof QuestionsTable.$inferInsert) {
  const [newQuestion] = await db.insert(QuestionsTable).values(question).returning({
    id: QuestionsTable.id,
  });

  revalidateQuestionsPreviewsCacheByJobId(question.jobId);
  revalidateQuestionsCacheByJobId(question.jobId);

  return newQuestion.id;
}
