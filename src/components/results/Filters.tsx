import React, { useMemo } from "react";
import type { Evaluation, Verdict } from "../../types/types";
import { getJudgeAndQuestionOptions } from "../../services/getOptions";
import { useJudges } from "../../context/JudgesContext";

interface FiltersProps {
  evaluations: Evaluation[];
  judgeFilter: string[];
  questionFilter: string[];
  verdictFilter: Verdict[];
  setJudgeFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setQuestionFilter: React.Dispatch<React.SetStateAction<string[]>>;
  setVerdictFilter: React.Dispatch<React.SetStateAction<Verdict[]>>;
  judgeOptions: { id: string; name: string }[];
  questionOptions: string[];
}

const verdictOptions: Verdict[] = ["pass", "fail", "inconclusive"];

const Filters = ({
  evaluations,
  judgeFilter,
  setJudgeFilter,
  questionFilter,
  setQuestionFilter,
  verdictFilter,
  setVerdictFilter,
  judgeOptions,
  questionOptions
}: FiltersProps) => {
  // Generic toggle function that works with any array type
  const toggleSelection = <T,>(
    value: T,
    setSelected: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="flex gap-6 mb-4">
      <div>
        <p className="font-semibold mb-1">Judges</p>
        {judgeOptions.map(j => (
          <label key={j.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={judgeFilter.includes(j.id)}
              onChange={() => toggleSelection(j.id, setJudgeFilter)}
              className="accent-blue-600 dark:accent-blue-400"
            />
            {j.name}
          </label>
        ))}
      </div>
      <div>
        <p className="font-semibold mb-1">Questions</p>
        {questionOptions.map(q => (
          <label key={q} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={questionFilter.includes(q)}
              onChange={() => toggleSelection(q, setQuestionFilter)}
              className="accent-blue-600 dark:accent-blue-400"
            />
            {q}
          </label>
        ))}
      </div>
      <div>
        <p className="font-semibold mb-1">Verdicts</p>
        {verdictOptions.map(v => (
          <label key={v} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={verdictFilter.includes(v)}
              onChange={() => toggleSelection(v, setVerdictFilter)}
              className="accent-blue-600 dark:accent-blue-400"
            />
            {v}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filters;