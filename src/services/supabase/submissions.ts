import { supabase } from "./supabase";
import type { Submission } from "../../types/types";

export const saveSubmission = async (submission: Submission) => {
  const { error } = await supabase.from("submissions").insert(submission);
  if (error) {
    throw new Error(error.message || "Failed to save submission");
  }
};

export const getSubmissions = async () => {
    const { data, error } = await supabase
      .from("submissions")
      .select("*");

    if (error) {
      throw new Error(error.message || "Failed to fetch submissions");
    }

    return data;
};

export const getSubmission = async(id:string) => {
  const {data,error} = await supabase.from("submissions")
  .select("*").eq("id", id).maybeSingle()

  if (error){
    throw new Error(error.message || "Failed to fetch submission")
  }

  return data
}
