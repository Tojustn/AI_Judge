import type { Question } from "../../types/types";
import { supabase } from "./supabase";

export const saveMultipleQuestions = async (questions: Question[]) => {
  const { error } = await supabase.from("questions").insert(questions);
  if (error) {
    throw new Error(error.message || "Error uploading questions");
  }
};

export const saveQuestion = async (question: Question) => {
  const { error } = await supabase.from("questions").insert(question);
  if (error) {
    throw new Error(error.message || "Error uploading question");
  }
};

export const getQuestionBySessionId = async(submissionId:string) => {
    const {data,error} = await supabase.from("questions")
  .select("*").eq("submissionId", submissionId)

  if (error){
    throw new Error(error.message || "Failed to fetch questions")
  }

  return data
  
}