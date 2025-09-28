import { useState, useEffect } from "react";
import type { Question } from "../types/types";
import { getAssignedJudgesByQuestion } from "../services/supabase/judges";

export const useQuestionAssignments = (
  queueId: string,
  questions: Question[]
) => {
  const [assignments, setAssignments] = useState<Map<string, string[]>>(
    new Map()
  );
  const [loading, setLoading] = useState(true);

  const getKey = (questionId: string) => JSON.stringify([queueId, questionId]);

  const updateAssignment = (questionId: string, judgeIds: string[]) => {
    setAssignments((prev) => {
      const newMap = new Map(prev);
      newMap.set(getKey(questionId), judgeIds);
      return newMap;
    });
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      for (const q of questions) {
        try {
          const assigned = await getAssignedJudgesByQuestion(q.id,  queueId);
          updateAssignment(
            q.id,
            assigned.map((j) => j.id)
          );
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
    };
    fetchAssignments();
  }, [queueId, questions]);

  return { assignments, updateAssignment, loading };
};
