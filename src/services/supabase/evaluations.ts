import { supabase } from "./supabase";
import type { Evaluation, AIResponse} from "../../types/types";

export const getEvaluations = async () => {
  const { data, error } = await supabase.from("evaluations").select("*");

  if (error) {
    throw new Error(error.message || "Failed to Fetch Evaluations");
  }

  return data;
};

export const saveEvaluations = async (AIResponses: any[]) => {
  const successfulResponses = AIResponses.filter((e) => e.success);

  const evaluationsToInsert = successfulResponses.map((resp) => {
    const [submissionId, questionId] = JSON.parse(resp.taskId);
    const { verdict, reasoning } = resp.evaluation;

    return {
      judgeId: resp.judgeId,
      submissionId: submissionId,
      questionId: questionId,
      verdict,
      reasoning,
    };
  });

  const { error } = await supabase
    .from("evaluations")
    .insert(evaluationsToInsert);

  if (error) throw new Error(error.message || "Error uploading evaluations");
};
