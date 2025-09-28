import { useState, useEffect } from "react";
import type { Evaluation } from "../types/types";
import { getEvaluations } from "../services/supabase/evaluations";

export const useResults = () => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        setLoading(true);
        setError(null);
        const evaluations = await getEvaluations();
        setEvaluations(evaluations || []);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load evaluations";
        setError(errorMessage);
        console.error("Error fetching queues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQueues();
  }, []);

  return { evaluations, loading, error };
};
