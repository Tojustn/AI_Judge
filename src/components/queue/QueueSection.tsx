import QueueList from "./QueueListComponent";
import LoadingState from "../common/LoadingState";
import type { Queue } from "../../types/types";

interface QueueSectionProps {
  queues: Queue[];
  loading: boolean;
  error: string | null;
  onDelete: (id: string) => void;
}

const QueueSection = ({ queues, loading, error, onDelete }: QueueSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Queue List
      </h2>
      {loading ? (
        <LoadingState message="Loading Queues" />
      ) : error ? (
        <div className="text-red-600 dark:text-red-400">Error: {error}</div>
      ) : (
        <QueueList queues={queues} onDelete={onDelete} />
      )}
    </div>
  );
};

export default QueueSection;
