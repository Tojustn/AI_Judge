import type { Question } from "../../types/types";
import { QuestionCard } from "../cards/QuestionCard";
import React,{useEffect, useState} from 'react'
import type { Judge } from "../../types/types";
import { Button } from "../Button";
import { getActiveJudges } from "../../services/supabase/judges";


interface QuestionListProp {
  questions: Question[];
}
const QuestionListComponent = ({ questions }: QuestionListProp) => {
  if (!questions || questions.length === 0) {
    return <div className="p-4 text-gray-500">No questions to display.</div>;
  }
    const [judges, setJudges] = useState<Judge[]>([]);

    useEffect(()=>{
        const fetchJudges = async() =>{ 
            try{
          const judges = await getActiveJudges()
           setJudges(judges)
            }catch(error){
                alert(error)
            }
        }

        fetchJudges();
    },[])
  return (
    <div className = "flex flex-col">
    <div className="grid grid-cols-5">
      {questions.map((question) => (
        <QuestionCard key={question.id} judges={judges} question={question} />
      ))}
    </div>
    <Button>Save All Assignments</Button>
    </div>
  );
};

export default QuestionListComponent;
