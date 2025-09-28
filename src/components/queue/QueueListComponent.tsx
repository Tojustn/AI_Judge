import type { Queue } from "../../types/types";
import QueueCard from "./QueueCard";

interface SubmissionProps {
  queues: Queue[];
  onDelete: (id: string) => void;
}
const QueueList = ({ queues, onDelete }: SubmissionProps) => {
  if (!queues || queues.length === 0) {
    return <div className="p-4 text-gray-500">No queues to display.</div>;
  }

  return (
    <div className="space-x-4 grid grid-cols-5">
      {queues.map((queue) => (
        <QueueCard key={queue.id} queue={queue} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default QueueList;
