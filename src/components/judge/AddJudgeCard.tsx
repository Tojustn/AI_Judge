import React, { useState, useRef } from "react";
import type { Judge, TargetModelName } from "../../types/types";
import RadioComponent from "./RadioComponent";
import { generateId } from "../../services/utils/generate_id";
import { saveJudge } from "../../services/supabase/judges";
interface AddJudgeCardProps {
  changeState: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddJudgeCard = ({ changeState }: AddJudgeCardProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const instructionRef = useRef<HTMLTextAreaElement>(null);
  const [targetModelName, setTargetModelName] =
    useState<TargetModelName>("gpt-4");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!nameRef.current || !instructionRef.current) {
        throw new Error("Must fill out fields");
      }
      const judge: Judge = {
        name: nameRef.current.value,
        rubric: instructionRef.current.value,
        targetModelName: targetModelName,
        active: true,
        id: generateId(),
        createdAt: Date.now(),
      };
      await saveJudge(judge);
      changeState(false);
    } catch (error) {
      alert(error);
    }
  };

  const onModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTargetModelName(e.target.value as TargetModelName);
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Add New Judge
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-300">
            Judge Name
          </label>
          <input
            type="text"
            required
            ref={nameRef}
            className="px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 dark:text-gray-300">
            Instructions
          </label>
          <textarea
            ref={instructionRef}
            className="px-3 py-2 border rounded-lg border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            rows={3}
          />
        </div>

        <RadioComponent
          chosen={targetModelName}
          onChange={onModelChange}
        ></RadioComponent>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddJudgeCard;
