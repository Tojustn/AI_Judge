import type { Question, Judge, Answer} from "../../types/types";
import JudgeCheckboxDropdown from "../judge/JudgeCheckboxDropdown";
import { useState } from "react";
import { useAnswers } from "../../hooks/useAnswers";
import AnswerDropdown from "./AnswerDropdown";

interface QuestionCardProps {
  question: Question;
  judges: Judge[];
  selectedJudges: string[];
  onAssignmentChange: (questionId: string, judgeIds: string[]) => void;
}

export const QuestionCard = ({
  question,
  judges,
  selectedJudges,
  onAssignmentChange,
}: QuestionCardProps) => {

  const {answers, loading, error} = useAnswers(question.id, question.queueId)
  const [showAnswers, setShowAnswers] = useState<boolean>(false);

  return (
    <div className="border rounded-xl p-6 m-3 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-4 flex-wrap">
        <span className="text-xs font-medium text-white bg-blue-500 px-3 py-1 rounded-full">
          {question.questionType}
        </span>
        <span className="text-xs text-gray-400">Rev: {question.rev}</span>
      </div>

      <h3 className="text-md font-semibold text-gray-800 dark:text-white">
        Question {question.id}
      </h3>

      <p className="text-gray-700 dark:text-white leading-relaxed mb-4">
        {question.questionText}
      </p>


      <AnswerDropdown answers={answers} loading={loading} error={error}></AnswerDropdown>
      <JudgeCheckboxDropdown
        questionId={question.id}
        onAssignmentChange={onAssignmentChange}
        availableJudges={judges}
        selectedJudges={selectedJudges}
      />

      <span className="text-xs text-gray-400 mb-3">
        Submission Id: {question.submissionId}
      </span>
    </div>
  );
};
