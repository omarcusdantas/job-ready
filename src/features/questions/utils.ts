import { questionDifficulties } from "@/drizzle/schema";

export type QuestionDifficulty = (typeof questionDifficulties)[number];

export function formatQuestionDifficulty(difficulty: QuestionDifficulty) {
  switch (difficulty) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Hard";
  }
}
