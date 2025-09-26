import type { Judge } from "../types/types"
import {useState} from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface JudgeCheckboxDropdownProps{
  questionId: string,
  availableJudges: Judge[],
  selectedJudges: Judge[],
  setSelectedJudges:React.Dispatch<React.SetStateAction<Judge[]>>;
  onAssignmentChange: (qusetionId: string, judgeIds: string[]) => void;
}

const JudgeCheckboxDropdown = ({questionId, availableJudges, selectedJudges, setSelectedJudges, onAssignmentChange}: JudgeCheckboxDropdownProps) => {
  const [isOpen , setIsOpen] = useState<boolean>(false);

const handleToggle = (judge: Judge) => {
  if(selectedJudges.some(j => j.id === judge.id)){
    const newSelection = selectedJudges.filter(j => j.id !== judge.id);
    setSelectedJudges(newSelection); 
    onAssignmentChange(questionId, selectedJudges.map(j=>j.id))
  }
  else{
    setSelectedJudges(prev => [...prev, judge]); 

    onAssignmentChange(questionId, selectedJudges.map(j=>j.id))
  }
}

  return (
    <div className = "flex flex-col">
      <div className = "flex flex-row">
    <button onClick={()=> setIsOpen(!isOpen)}>{isOpen ? <ChevronDown/>: <ChevronUp/> }</button><p>Judges</p>
    </div>
    {isOpen && (
    availableJudges.map((judge) => (
<label key={judge.id}>
  <input
    className = "mx-3"
    type="checkbox"
    checked={selectedJudges.some(j => j.id === judge.id)}
    onChange = {()=>handleToggle(judge)}
  />
  {judge.name}
</label>
    )))
  }
  </div>
  )
}

export default JudgeCheckboxDropdown
