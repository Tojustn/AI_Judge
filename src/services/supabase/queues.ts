import { supabase } from "./supabase";
import { type Queue } from "../../types/types";

export const getQueue = async (id: string) => {
  const { data, error } = await supabase
    .from("queues")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message || "Failed to fetch queue");
  }

  return data;
};

export const getQueues = async () => {
  const { data, error } = await supabase
    .from("queues")
    .select("*")
    .order("createdAt", { ascending: false });
  if (error) {
    throw new Error(error.message || "Failed to fetch queues");
  }

  return data;
};

export const saveQueue = async (queue: Queue) => {
  const { error } = await supabase.from("queues").upsert(queue);

  if (error) {
    throw new Error(error.message || "Error uploading queue");
  }
};

export const deleteQueue = async(queueId: string ) =>{
  console.log(queueId)
const response = await supabase
  .from('queues')
  .delete()
  .eq('id', queueId)

  if (response.status !== 204) {
    throw new Error("Unsuccessful Delete")
  }
}