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
