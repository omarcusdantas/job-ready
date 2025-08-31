import { relations } from "drizzle-orm";
import { pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "./helpers";
import { QuestionsTable } from "./question";

export const experienceLevels = ["junior", "mid-level", "senior"] as const;
export const experienceLevelEnum = pgEnum("experience_level", experienceLevels);

export const JobsTable = pgTable("jobs", {
  id,
  name: varchar().notNull(),
  description: varchar().notNull(),
  experienceLevel: experienceLevelEnum().notNull(),
  createdAt,
  updatedAt,
});

export const jobRelations = relations(JobsTable, ({ many }) => ({
  questions: many(QuestionsTable),
}));
