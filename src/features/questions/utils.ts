import { questionDifficulties } from "@/drizzle/schema";

export function formatQuestionDifficulty(difficulty: (typeof questionDifficulties)[number]) {
  switch (difficulty) {
    case "easy":
      return "Easy";
    case "medium":
      return "Medium";
    case "hard":
      return "Hard";
  }
}
