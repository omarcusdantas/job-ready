import { experienceLevels } from "@/drizzle/schema";

export function formatExperienceLevel(level: (typeof experienceLevels)[number]) {
  switch (level) {
    case "junior":
      return "Junior";
    case "mid-level":
      return "Mid-Level";
    case "senior":
      return "Senior";
  }
}
