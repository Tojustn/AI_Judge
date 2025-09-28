import type { Judge } from "../../types/types";
import { useState } from "react";
import { deleteJudge } from "../../services/supabase/judges";
import EditJudgeCard from "./EditJudgeCard";
import Modal from "../common/Modal";

interface JudgeProps {
  judge: Judge;
  onDelete: (id: string) => void;
}

export const JudgeCard = ({ judge, onDelete}: JudgeProps) => {
  const [editJudge, setEditJudge] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this judge?"
    );
    if (confirmed) {
      try {
        await deleteJudge(judge.id);
        onDelete(judge.id)
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <div className="border rounded p-4 m-2 bg-white dark:bg-gray-800 shadow">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">{judge.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">Using: {judge.targetModelName}</p>

        <button
          onClick={() => setEditJudge(true)}
          className="text-blue-600 dark:text-blue-400 hover:underline mt-2"
        >
          Edit
        </button>

        <p
          className="text-red-600 dark:text-red-400 hover:cursor-pointer mt-2"
          onClick={handleDelete}
        >
          <strong>Delete</strong>
        </p>
      </div>

      <Modal
        isOpen={editJudge}
        onClose={() => setEditJudge(false)}
        title="Edit Judge"
      >
        <EditJudgeCard judge={judge} />
      </Modal>
    </div>
  );
};
