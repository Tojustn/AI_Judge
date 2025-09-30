import React, { useState } from "react";
import { type Judge, type TargetModelName } from "../../types/types";
import RadioComponent from "./RadioComponent";
import { updateJudge } from "../../services/supabase/judges";

interface EditJudgeProps {
  judge: Judge;
}

const EditJudgeCard = ({ judge }: EditJudgeProps) => {
  const [name, setName] = useState(judge.name);
  const [instructions, setInstructions] = useState(judge.rubric);
  const [targetModelName, setTargetModelName] = useState<TargetModelName>(
    judge.targetModelName as TargetModelName
  );
  const [isActive, setIsActive] = useState(judge.active);

  const onModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetModelName(e.target.value as TargetModelName);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedJudge: Judge = {
        name: name,
        rubric: instructions,
        targetModelName: targetModelName,
        active: isActive,
        id: judge.id,
        createdAt: judge.createdAt,
      };
      await updateJudge(updatedJudge);
      alert("Successfully updated Judge");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 dark:text-gray-300">
          Judge Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
        />
      </div>

      <div className="flex flex-col">
        <label className="mb-1 text-gray-700 dark:text-gray-300">
          Instructions
        </label>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          rows={3}
        />
      </div>

<div className="my-5 flex items-center gap-2">
  <input
    type="checkbox"
    checked={isActive}
    onChange={() => setIsActive(!isActive)}
  />
  <label className="text-gray-700 dark:text-gray-300">
    Active
  </label>
</div>


      <RadioComponent
        chosen={targetModelName}
        onChange={onModelChange}
      ></RadioComponent>
      <button
        type="submit"
        className="my-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Update
      </button>
    </form>
  );
};

export default EditJudgeCard;
