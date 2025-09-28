import type { Queue } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { deleteQueue } from "../../services/supabase/queues";

interface QueueCardProps {
  queue: Queue;
}
const QueueCard = ({ queue }: QueueCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/queues/${queue.id}/`);
  };

const handleDeleteQueue = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this queue?");
  if (!confirmed) return;

  try {
    await deleteQueue(queue.id);
    alert("Queue deleted successfully.");
    window.location.reload();
  } catch (err) {
    console.error("Error deleting queue:", err);
    alert("Failed to delete the queue.");
  }
};
  return (
    <div
      className="cursor-pointer block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {queue.id}
      </h5>
      <p onClick={handleClick} className="font-normal text-gray-700 dark:text-gray-400">
        Click Here to Assign Judges
      </p>
      <button onClick={handleDeleteQueue} className="font-normal text-red-600 ">
      Delete
      </button>
    </div>
  );
};

export default QueueCard;
