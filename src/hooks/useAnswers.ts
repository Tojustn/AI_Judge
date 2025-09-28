// hooks/useAnswers.ts
import { useState, useEffect } from 'react';
import { getAnswersByQuestionId } from '../services/supabase/answers';
import type { Answer } from '../types/types';

export const useAnswers = (questionId: string, queueId: string) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchAnswers = async (): Promise<void> => {
      try {
        setLoading(true);
        const data: Answer[] = await getAnswersByQuestionId(questionId, queueId);
        setAnswers(data);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load answers';
        setError(errorMessage);
        console.error('Failed to load answers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswers();
  }, [questionId]);
  
  return { answers, loading, error };
};