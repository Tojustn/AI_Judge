import { parseFile } from "./fileUtils.ts";
import { saveSubmission } from "./supabase/submissions.ts";
import saveMultipleAnswers from "./supabase/answers.ts";
import { saveMultipleQuestions } from "./supabase/questions.ts";
import type {
  Question,
  Answer,
  Submission,
  JSONSubmission,
  JSONSubmissions,
} from "../types/types.ts";

export const handleFileUpload = async (file: File) => {
  try {
    const parsed: JSONSubmission | JSONSubmissions = await parseFile(file);

    // Force subssions to be an array
    const submissions: JSONSubmission[] = Array.isArray(parsed)
      ? parsed
      : [parsed];

    for (const fileData of submissions) {
      const submission: Submission = {
        id: fileData.id,
        createdAt: fileData.createdAt,
        labelingTaskId: fileData.labelingTaskId,
        queueId: fileData.queueId,
      };

      await saveSubmission(submission);

      const questions: Question[] = [];

      fileData.questions.forEach((question) => {
        const questionRecord = {
          ...question.data,
          rev: question.rev,
          submissionId: fileData.id,
        } as Question;
        questions.push(questionRecord);
      });
      await saveMultipleQuestions(questions);

      const answers: Answer[] = [];
      Object.entries(fileData.answers).forEach(([questionId, answerData]) => {
        const answerRecord = { ...answerData, questionId } as Answer;
        answers.push(answerRecord);
      });
      await saveMultipleAnswers(answers);
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(message);
  }
};
