import { relations } from "drizzle-orm";
import { pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "./helpers";
import { JobsTable } from "./job";

export const questionDifficulties = ["easy", "medium", "hard"] as const;
export const questionDifficultyEnum = pgEnum("questions_question_difficulty", questionDifficulties);

export const QuestionsTable = pgTable("questions", {
  id,
  difficulty: questionDifficultyEnum().notNull(),
  text: varchar().notNull(),
  createdAt,
  updatedAt,
  jobId: uuid()
    .references(() => JobsTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const questionsRelations = relations(QuestionsTable, ({ one }) => ({
  job: one(JobsTable, {
    fields: [QuestionsTable.jobId],
    references: [JobsTable.id],
  }),
}));
