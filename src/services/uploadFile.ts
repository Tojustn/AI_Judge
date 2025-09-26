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
import { supabase } from "./supabase/supabase.ts";

export const handleFileUpload = async (file: File) => {
  try {
    const parsed: JSONSubmission | JSONSubmissions = await parseFile(file);
    const submissions: JSONSubmission[] = Array.isArray(parsed)
      ? parsed
      : [parsed];

    const results = [];
    
    // Process each submission with its questions and answers in its own transaction
    for (const submissionData of submissions) {
      try {
        if (!submissionData.id || !submissionData.createdAt || !submissionData.labelingTaskId || !submissionData.queueId) {
          throw new Error(`Missing required fields in submission ${submissionData.id || 'unknown'}`);
        }

        if (!submissionData.questions || !Array.isArray(submissionData.questions)) {
          throw new Error(`Invalid or missing questions array for submission ${submissionData.id}`);
        }

        if (!submissionData.answers || typeof submissionData.answers !== 'object') {
          throw new Error(`Invalid or missing answers object for submission ${submissionData.id}`);
        }

        // Validate each question has required fields
        for (let i = 0; i < submissionData.questions.length; i++) {
          const question = submissionData.questions[i];
          if (!question.data?.id || !question.data?.questionType || !question.data?.questionText) {
            throw new Error(`Invalid question data at index ${i} for submission ${submissionData.id}`);
          }
          if (question.rev === undefined || question.rev === null) {
            throw new Error(`Missing rev field in question at index ${i} for submission ${submissionData.id}`);
          }
        }

        // Validate answers match questions
        const questionIds = submissionData.questions.map(q => q.data.id);
        const answerIds = Object.keys(submissionData.answers);
        
        for (const answerId of answerIds) {
          if (!questionIds.includes(answerId)) {
            throw new Error(`Answer exists for question ${answerId} but no matching question found in submission ${submissionData.id}`);
          }
        }

        // Call RPC function to process submission, questions, and answers automatically 
        const { data, error } = await supabase.rpc('process_submission_transaction', {
          submission_data: submissionData
        });

        if (error) {
          throw new Error(error.message);
        }

        results.push({ 
          id: submissionData.id, 
          status: 'success', 
          questionsProcessed: data?.questions_inserted || 0,
          answersProcessed: data?.answers_inserted || 0,
          data 
        });

      } catch (error) {
        results.push({ 
          id: submissionData.id, 
          status: 'failed', 
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    const successful = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'failed').length;
    
    // Calculate totals for questions and answers processed
    const totalQuestions = results
      .filter(r => r.status === 'success')
      .reduce((sum, r) => sum + (r.questionsProcessed || 0), 0);
    
    const totalAnswers = results
      .filter(r => r.status === 'success')
      .reduce((sum, r) => sum + (r.answersProcessed || 0), 0);

    return {
      total: submissions.length,
      successful,
      failed,
      totalQuestions,
      totalAnswers,
      details: results
    };

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`File upload failed: ${message}`);
  }
};
