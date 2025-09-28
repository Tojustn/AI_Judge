import type { Judge } from "../../types/types";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface JudgeCheckboxDropdownProps {
  questionId: string;
  availableJudges: Judge[];
  selectedJudges: string[];
  onAssignmentChange: (questionId: string, judgeIds: string[]) => void;
}

const JudgeCheckboxDropdown = ({
  questionId,
  availableJudges,
  selectedJudges,
  onAssignmentChange,
}: JudgeCheckboxDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (judgeId: string) => {
    const newSelection = selectedJudges.includes(judgeId)
      ? selectedJudges.filter((id) => id !== judgeId)
      : [...selectedJudges, judgeId];

    onAssignmentChange(questionId, newSelection);
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-full p-2 bg-gray-50 dark:bg-gray-700 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
      >
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        <span className="font-medium">
Judges (
  {
    selectedJudges.filter(
      judgeId => availableJudges.some(j => j.id === judgeId)
    ).length
  } selected)

        </span>
      </button>

      {isOpen && (
        <div className="mt-2 p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          {availableJudges.map((judge) => (
            <label
              key={judge.id}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded transition-colors"
            >
              <input
                type="checkbox"
                checked={selectedJudges.includes(judge.id)}
                onChange={() => handleToggle(judge.id)}
                className="rounded border-gray-300 dark:border-gray-500"
              />
              <span className="text-sm">{judge.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default JudgeCheckboxDropdown;
