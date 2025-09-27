import { useState, useEffect } from "react";
import { getQueue } from "../services/supabase/queues";
import { getQuestionsByQueueId } from "../services/supabase/questions";
import type { Queue, Question } from "../types/types";

export const useQueueDetails = (queueId: string | undefined) => {
  const [queue, setQueue] = useState<Queue | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!queueId) {
      setError("Queue ID is required");
      return;
    }

    const fetchQueueDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        const [queueData, questionsData] = await Promise.all([
          getQueue(queueId),
          getQuestionsByQueueId(queueId),
        ]);
        setQueue(queueData);
        setQuestions(questionsData || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load queue details";
        setError(errorMessage);
        console.error("Error fetching queue details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueueDetails();
  }, [queueId]);

  return { queue, questions, loading, error };
};
