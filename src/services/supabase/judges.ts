import type { Judge } from "../../types/types";
import { supabase } from "./supabase";

export const getJudges = async () => {
  const { data, error } = await supabase.from("judges").select("*");

  if (error) {
    throw new Error(error.message || "Failed to Fetch Judges");
  }

  return data;
};

export const getActiveJudges = async () => {
  const { data, error } = await supabase
    .from("judges")
    .select()
    .eq("active", true);

  if (error) {
    throw new Error(error.message || "Failed to Fetch Judges");
  }

  return data;
};

export const saveJudge = async (judge: Judge) => {
  const { error } = await supabase.from("judges").insert(judge);
  if (error) {
    throw new Error(error.message || "Error uploading judge");
  }
};

export const deleteJudge = async (id: string) => {
  console.log(id)
  const response = await supabase.from("judges").delete().eq("id", id);

  if(response.status !== 204){
    throw new Error(response.error?.message || "Error deleting judge");
  }

};

export const getAssignedJudgesByQuestion = async (
  questionId: string, queueId: string
): Promise<Judge[]> => {
  const { data, error } = await supabase
    .from("JudgesQuestionsAssignment")
    .select(
      `
      judgeId,
      judges (
        id,
        name,
        targetModelName,
        rubric,
        active, createdAt
      )
    `
    )

    .eq("queueId", queueId).eq("questionId", questionId);

  if (error) {
    throw new Error(error.message || "Failed to Fetch Judges");
  }

  // Remove the JudgeId make it one json
  return data?.flatMap((assignment) => assignment.judges|| []) || [];
};

export const updateJudge = async (judge: Judge) => {
  const { error } = await supabase
    .from("judges")
    .update(judge)
    .eq("id", judge.id);

  if (error) {
    throw new Error(error.message);
  }
};
