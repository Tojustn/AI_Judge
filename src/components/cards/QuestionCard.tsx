import type { Question } from "../../types/types";
import type { Judge } from "../../types/types";
import JudgeCheckboxDropdown from "../JudgeCheckboxDropdown";
import {useState, useEffect} from "react"
import { getAssignedJudgesByQuestion } from "../../services/supabase/judges";

interface QuestionCardProps {
  question: Question;
  judges: Judge[]
}

export const QuestionCard = ({ question, judges}: QuestionCardProps) => {
  const [selectedJudges, setSelectedJudges] = useState<Judge[]>([]);

  useEffect(()=>{
    const fetchInfo = async() => {
      try{
      const judges = await getAssignedJudgesByQuestion(question.id)
      setSelectedJudges(judges)
      }catch(error){
        alert(error)
      }
    }

    fetchInfo()
  }, []) 

  return (
    <div className="border rounded-xl p-6 m-3 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-medium text-white bg-blue-500 px-3 py-1 rounded-full">
          {question.questionType}
        </span>
        <span className="text-xs text-gray-400">Rev: {question.rev}</span>
      </div>

      <h3 className="text-md font-semibold text-gray-800 mb-3">
        Question {question.id}
      </h3>
      <p className="text-gray-700 leading-relaxed mb-4">
        {question.questionText}
      </p>

      <div className="border-t border-gray-100 pt-3 text-gray-500 text-xs">
        Submission ID: {question.submissionId}
      </div>
      <JudgeCheckboxDropdown availableJudges={judges} selectedJudges={selectedJudges} setSelectedJudges={setSelectedJudges}></JudgeCheckboxDropdown>
    </div>
  );
};
