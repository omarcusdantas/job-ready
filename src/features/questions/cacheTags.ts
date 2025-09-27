import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

const questionsTag = "questions";

function getQuestionsTagByJobId(jobId: string) {
  return `${questionsTag}:job:${jobId}`;
}

export function cacheQuestionsByJobId(jobId: string) {
  cacheTag(getQuestionsTagByJobId(jobId));
}

export function revalidateQuestionsCacheByJobId(jobId: string) {
  revalidateTag(getQuestionsTagByJobId(jobId));
}
