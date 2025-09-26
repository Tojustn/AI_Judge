import type { Submission } from "../../types/types";
import { useNavigate } from "react-router-dom";

interface QueueCardProps{
  queue: Submission;
}
const QueueCard = ({queue}: QueueCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/queues/${queue.id}/`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {queue.queueId}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Click to Assign Judges
      </p>
    </div>
  );
};

export default QueueCard;
