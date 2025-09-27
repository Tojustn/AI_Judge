import type { Judge } from "../../types/types";
import { useState } from "react";
import { deleteJudge } from "../../services/supabase/judges";
import EditJudgeCard from "./EditJudgeCard";
import Modal from "../Modal";

interface JudgeProps {
  judge: Judge;
}

export const JudgeCard = ({ judge }: JudgeProps) => {
  const [editJudge, setEditJudge] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this judge?"
    );
    if (confirmed) {
      try {
        await deleteJudge(judge.id);
        window.location.reload();
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <div>
      <div className="border rounded p-4 m-2 bg-white shadow">
        <h2 className="text-lg font-bold">{judge.name}</h2>
        <p className="text-gray-600">Using: {judge.targetModelName}</p>
        <button onClick={() => setEditJudge(true)} className="text-gray-600">
          Edit
        </button>
        <p className="text-red-600 hover:cursor-pointer" onClick={handleDelete}>
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
