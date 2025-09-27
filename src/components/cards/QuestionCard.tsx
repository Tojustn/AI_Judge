import type { Question } from "../../types/types";
import type { Judge } from "../../types/types";
import JudgeCheckboxDropdown from "../JudgeCheckboxDropdown";
import { useState, useEffect } from "react";
import { getAssignedJudgesByQuestion } from "../../services/supabase/judges";

interface QuestionCardProps {
  question: Question;
  judges: Judge[];
  setAssignments: React.Dispatch<React.SetStateAction<Map<string, string[]>>>;
  onAssignmentChange: (questionId: string, judgeIds: string[]) => void;
}

export const QuestionCard = ({
  question,
  judges,
  setAssignments,
  onAssignmentChange,
}: QuestionCardProps) => {
  const [selectedJudges, setSelectedJudges] = useState<Judge[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const assigned = await getAssignedJudgesByQuestion(question.id);
        setSelectedJudges(assigned);
        setAssignments((prev) => {
          const newMap = new Map(prev);
          const key = JSON.stringify([question.queueId, question.id]);
          newMap.set(
            key,
            assigned.map((j) => j.id)
          );
          return newMap;
        });
      } catch (error) {
        alert(error);
      }
    };

    fetchInfo();
  }, [question.id, setAssignments]);

  return (
    <div className="border rounded-xl p-6 m-3 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <span className="text-xs font-medium text-white bg-blue-500 px-3 py-1 rounded-full">
          {question.questionType}
        </span>
        <span className="text-xs text-gray-400">Rev: {question.rev}</span>
      </div>

      <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3">
        Question {question.id}
      </h3>
      <p className="text-gray-700 dark:text-white leading-relaxed mb-4">
        {question.questionText}
      </p>

      <JudgeCheckboxDropdown
        questionId={question.id}
        onAssignmentChange={onAssignmentChange}
        availableJudges={judges}
        selectedJudges={selectedJudges}
        setSelectedJudges={setSelectedJudges}
      ></JudgeCheckboxDropdown>
    </div>
  );
};
