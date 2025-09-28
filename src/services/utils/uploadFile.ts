import { parseFile } from "./fileUtils.ts";
import { saveSubmission } from "../supabase/submissions.ts";
import saveMultipleAnswers from "../supabase/answers.ts";
import { saveMultipleQuestions } from "../supabase/questions.ts";
import { saveQueue } from "../supabase/queues.ts";
import { generateId } from "./generate_id.ts";
import type { JSONSubmission, JSONSubmissions } from "../../types/types.ts";

export const handleFileUpload = async (file: File) => {
  const parsed: JSONSubmission | JSONSubmissions = await parseFile(file);
  const submissions: JSONSubmission[] = Array.isArray(parsed)
    ? parsed
    : [parsed];

  const uniqueQueueIds = [...new Set(submissions.map((s) => s.queueId))];

  for (const queueId of uniqueQueueIds) {
    await saveQueue({ id: queueId, createdAt: Date.now() });
  }

  for (const submissionData of submissions) {
    if (
      !submissionData.id ||
      !submissionData.createdAt ||
      !submissionData.labelingTaskId ||
      !submissionData.queueId
    ) {
      throw new Error(
        `Missing required fields in submission ${
          submissionData.id || "unknown"
        }`
      );
    }
    if (!submissionData.questions || !Array.isArray(submissionData.questions)) {
      throw new Error(
        `Invalid or missing questions array for submission ${submissionData.id}`
      );
    }
    if (!submissionData.answers || typeof submissionData.answers !== "object") {
      throw new Error(
        `Invalid or missing answers object for submission ${submissionData.id}`
      );
    }

    for (let i = 0; i < submissionData.questions.length; i++) {
      const question = submissionData.questions[i];
      if (
        !question.data?.id ||
        !question.data?.questionType ||
        !question.data?.questionText
      ) {
        throw new Error(
          `Invalid question data at index ${i} for submission ${submissionData.id}`
        );
      }
      if (question.rev === undefined || question.rev === null) {
        throw new Error(
          `Missing rev field in question at index ${i} for submission ${submissionData.id}`
        );
      }
    }

    const questionIds = submissionData.questions.map((q) => q.data.id);
    const answerIds = Object.keys(submissionData.answers);

    for (const answerId of answerIds) {
      if (!questionIds.includes(answerId)) {
        throw new Error(
          `Answer exists for question ${answerId} but no matching question found in submission ${submissionData.id}`
        );
      }
    }

    await saveSubmission({
      id: submissionData.id,
      queueId: submissionData.queueId,
      labelingTaskId: submissionData.labelingTaskId,
      createdAt: submissionData.createdAt,
    });

    const questionsToInsert = submissionData.questions.map((q) => ({
      id: q.data.id,
      queueId: submissionData.queueId,
      questionText: q.data.questionText,
      questionType: q.data.questionType,
      submissionId: submissionData.id,
      rev: q.rev,
    }));

    await saveMultipleQuestions(questionsToInsert);

    const answersToInsert = Object.entries(submissionData.answers).map(
      ([questionId, answerData]) => ({
        id: generateId(),
        questionId: questionId,
        queueId: submissionData.queueId,
        choice: answerData.choice || "",
        reasoning: answerData.reasoning || "",
        submissionId: submissionData.id,
      })
    );

    await saveMultipleAnswers(answersToInsert);

    return(uniqueQueueIds)
  }
};
