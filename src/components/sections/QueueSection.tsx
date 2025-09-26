import React from "react";
import QueueList from "../lists/QueueListComponent";
import LoadingState from "../state/LoadingState";
import type { Submission } from "../../types/types";

interface QueueSectionProps {
  queues: Submission[];
  loading: boolean;
  error: string | null;
}

const QueueSection = ({ queues, loading, error }: QueueSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Queue List
      </h2>
      {loading ? (
        <LoadingState message="Loading Queues" />
      ) : error ? (
        <div className="text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      ) : (
        <QueueList queues={queues} />
      )}
    </div>
  );
};

export default QueueSection;
