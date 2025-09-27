import QuestionListComponent from "../components/lists/QuestionListComponent";
import { useParams } from "react-router-dom";
import LoadingState from "../components/state/LoadingState";
import { useQueueDetails } from "../hooks/useQueueDetails";
const QueuePage = () => {
  const { queueId } = useParams<{ queueId: string }>();
  const { queue, questions, loading } = useQueueDetails(queueId);

  if (!queue && !loading) {
    return (
      <div className="p-4 text-gray-500">
        Queue Does Not Exist. Attempted Id: {queueId}
      </div>
    );
  }

  return (
    <div className="h-screen w-full dark:bg-gray-900 dark:text-white flex flex-col">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <LoadingState message="Fetching Queue" />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col y">
          <h1 className="text-xl mx-5">{queueId}</h1>
          {queueId && (
            <QuestionListComponent queueId={queueId} questions={questions} />
          )}
        </div>
      )}
    </div>
  );
};

export default QueuePage;
