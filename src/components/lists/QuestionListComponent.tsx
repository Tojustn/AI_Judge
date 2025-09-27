import type { Question } from "../../types/types";
import { QuestionCard } from "../cards/QuestionCard";
import React, { useEffect, useState } from "react";
import SaveAssignmentsButton from "../SaveAssignmentsButton";
import { useJudges } from "../../context/JudgesContext";

interface QuestionListProp {
  queueId: string;
  questions: Question[];
}
const QuestionListComponent = ({ queueId, questions }: QuestionListProp) => {
  if (!questions || questions.length === 0) {
    return <div className="p-4 text-gray-500">No questions to display.</div>;
  }
  const { judges } = useJudges();
  const [assignments, setAssignments] = useState<Map<string, string[]>>(
    new Map()
  );

  const handleAssignmentChange = (questionId: string, judgeIds: string[]) => {
    setAssignments((prev) => {
      const newMap = new Map(prev);
      const key = JSON.stringify([queueId, questionId]);
      newMap.set(key, judgeIds);
      return newMap;
    });
  };
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="grid grid-cols-5">
        {questions.map((question) => (
          <QuestionCard
            key={question.id}
            judges={judges}
            question={question}
            setAssignments={setAssignments}
            onAssignmentChange={handleAssignmentChange}
          />
        ))}
      </div>
      <SaveAssignmentsButton assignments={assignments}></SaveAssignmentsButton>
    </div>
  );
};

export default QuestionListComponent;
