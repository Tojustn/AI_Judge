import type { Question } from "../../types/types";
import { QuestionCard } from "../cards/QuestionCard";
import React,{useEffect, useState} from 'react'
import SaveAssignmentsButton from "../SaveAssignmentsButton";
import { useJudges } from "../../context/JudgesContext";


interface QuestionListProp {
  questions: Question[];
}
const QuestionListComponent = ({ questions }: QuestionListProp) => {
  if (!questions || questions.length === 0) {
    return <div className="p-4 text-gray-500">No questions to display.</div>;
  }
    const {judges} = useJudges();
    const [assignments, setAssignments] = useState<Map<string, string[]>>(new Map());

    const handleAssignmentChange = (questionId: string, judgeIds: string[]) =>{
     setAssignments(prev => {
      const newMap = new Map(prev);
      newMap.set(questionId, judgeIds);
      return newMap;
    });
    }
   return (
    <div className = "flex flex-col">
    <div className="grid grid-cols-5">
      {questions.map((question) => (
        <QuestionCard key={question.id} judges={judges} question={question} onAssignmentChange={handleAssignmentChange} />
      ))}
    </div>
    <SaveAssignmentsButton></SaveAssignmentsButton>
    </div>
  );
};

export default QuestionListComponent;
