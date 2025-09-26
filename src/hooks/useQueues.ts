import { useState, useEffect } from "react";
import { getSubmissions } from "../services/supabase/submissions";
import type { Submission } from "../types/types";

export const useQueues = () => {
  const [queues, setQueues] = useState<Submission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        setLoading(true);
        setError(null);
        const submissions = await getSubmissions();
        setQueues(submissions || []);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load queues';
        setError(errorMessage);
        console.error('Error fetching queues:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueues();
  }, []);

  return { queues, loading, error };
};
