import type { Question } from "../../types/types";
import { QuestionCard } from "./QuestionCard";
import { type Judge } from "../../types/types";

interface SubmissionCardProps {
  submissionId: string;
  questions: Question[];
  judges: Judge[];
  assignments: Map<string, string[]>;
  updateAssignment: (questionId: string, judgeIds: string[]) => void;
  queueId: string;
}

export const SubmissionCard = ({
  submissionId,
  questions,
  judges,
  assignments,
  updateAssignment,
  queueId,
}: SubmissionCardProps) => {
  return (
    <div className="my-8  rounded-xl p-4 bg-gray-50 dark:bg-gray-900 ">
      <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
        Submission {submissionId}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((question) => {
          const key = JSON.stringify([queueId, question.id]);
          const selectedJudges = assignments.get(key) || [];
          return (
            <QuestionCard
              key={question.id}
              question={question}
              judges={judges}
              selectedJudges={selectedJudges}
              onAssignmentChange={(questionId: string, judgeIds: string[]) => {
                updateAssignment(questionId, judgeIds);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};