import { unstable_cacheTag as cacheTag, revalidateTag } from "next/cache";

const questionsTag = "questions";

function getQuestionsTagByJobId(jobId: string) {
  return `${questionsTag}:job:${jobId}`;
}

function getQuestionsPreviewsTagByJobId(jobId: string) {
  return `${questionsTag}:previews:job:${jobId}`;
}

export function cacheQuestionsByJobId(jobId: string) {
  cacheTag(getQuestionsTagByJobId(jobId));
}

export function cacheQuestionsPreviewsByJobId(jobId: string) {
  cacheTag(getQuestionsPreviewsTagByJobId(jobId));
}

export function revalidateQuestionsPreviewsCacheByJobId(jobId: string) {
  revalidateTag(getQuestionsPreviewsTagByJobId(jobId));
}

export function revalidateQuestionsCacheByJobId(jobId: string) {
  revalidateTag(getQuestionsTagByJobId(jobId));
}
