import type { Answer } from "../../types/types";
import { supabase } from "./supabase";

export const saveAnswer = async (answer: Answer) => {
  const { error } = await supabase.from("answers").insert(answer);
  if (error) {
    throw new Error(error.message || "Error uploading answer");
  }
};

export const saveMultipleAnswers = async (answers: Answer[]) => {
  const { error } = await supabase.from("answers").insert(answers);
  if (error) {
    throw new Error(error.message || "Error uploading answers");
  }
};

export default saveMultipleAnswers;

export const getAnswers = async () => {
  const { data, error } = await supabase.from("answers").select("*");

  if (error) {
    throw new Error(error.message || "Failed to fetch questions");
  }

  return data;
};

export const getAnswersByQuestionId = async (questionId: string) => {
  const { data, error } = await supabase
    .from("answers")
    .select("*")
    .eq("questionId", questionId);

  if (error) {
    throw new Error(error.message || "Failed to fetch questions");
  }

  return data;
};

export const getAnswersByMultipleQuestionIds = async (
  questionIds: string[]
) => {
  if (questionIds.length === 0) return [];

  const { data, error } = await supabase
    .from("answers")
    .select("*")
    .in("questionId", questionIds);

  if (error) {
    throw new Error(`Failed to fetch answers: ${error.message}`);
  }

  return data || [];
};
