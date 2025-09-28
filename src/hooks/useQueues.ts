import { useState, useEffect } from "react";
import type { Queue } from "../types/types";
import { getQueues } from "../services/supabase/queues";

export const useQueues = () => {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        setLoading(true);
        setError(null);
        const queues = await getQueues();
        setQueues(queues || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load queues";
        setError(errorMessage);
        console.error("Error fetching queues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueues();
  }, []);

  return { queues, setQueues,  loading, error };
};
