import type { Judge } from "../../types/types";
import { supabase } from "./supabase";

export const getJudges = async()=>{
    const { data, error } = await supabase
    .from("judges")
    .select("*");

    if (error) {
      throw new Error(error.message || "Failed to Fetch Judges");
    }

    return data
}

export const getActiveJudges = async()=>{
    const { data, error } = await supabase
    .from("judges")
    .select().eq("active", true);


    if (error) {
      throw new Error(error.message || "Failed to Fetch Judges");
    }

    return data
}


export const saveJudge = async(judge: Judge) =>{
  const { error } = await supabase.from("judges").insert(judge);
  if (error) {
    throw new Error(error.message || "Error uploading judge");
  }
}

export const deleteJudge = async(id: string) =>{
  const response = await supabase
  .from('judges')
  .delete()
  .eq('id', id)
}