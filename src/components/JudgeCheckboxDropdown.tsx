import type { Judge } from "../types/types"
import {useState} from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface JudgeCheckboxDropdownProps{
  availableJudges: Judge[],
  selectedJudges: Judge[],
  setSelectedJudges:React.Dispatch<React.SetStateAction<Judge[]>>;
}

const JudgeCheckboxDropdown = ({availableJudges, selectedJudges, setSelectedJudges}: JudgeCheckboxDropdownProps) => {
  const [isOpen , setIsOpen] = useState<boolean>(false);

const handleToggle = (judge: Judge) => {
  if(selectedJudges.some(j => j.id === judge.id)){
    const newSelection = selectedJudges.filter(j => j.id !== judge.id);
    setSelectedJudges(newSelection); 
  }
  else{
    setSelectedJudges(prev => [...prev, judge]); 
  }
}

  return (
    <div className = "flex flex-col">
    <button onClick={()=> setIsOpen(!isOpen)}>{isOpen ? <ChevronDown/>: <ChevronUp/> }</button>
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
