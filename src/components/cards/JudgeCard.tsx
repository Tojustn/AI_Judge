import type { Judge } from "../../types/types";

import { deleteJudge } from "../../services/supabase/judges";
interface JudgeProps{
  judge: Judge;
}
export const JudgeCard = ({judge}: JudgeProps) => {

  const handleDelete = async() =>{
    const confirmed = window.confirm("Are you sure you want to delete this")
    if(confirmed){
      try{
        await deleteJudge(judge.id)
        window.location.reload();
      }
      catch(error){
       alert(error) 
      }
    }
  }
  return (
    <div className="border rounded p-4 m-2 bg-white shadow">
      <h2 className="text-lg font-bold">{judge.name}</h2>
      <p className="text-gray-600">Using: {judge.targetModelName}</p>
    <p className = "text-gray-600">Click to Edit Judge</p>
    <p className = "text-red-600 hover:cursor-pointer" onClick = {handleDelete}>Delete</p>
    </div>
  );
};