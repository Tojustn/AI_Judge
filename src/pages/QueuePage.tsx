import QuestionListComponent from "../components/lists/QuestionListComponent";
import { useParams } from "react-router-dom";
import { useState } from "react";
import LoadingState from "../components/LoadingState";
import { useQueueDetails } from "../hooks/useQueueDetails";
import { useNavigate } from "react-router-dom";
import RunEvaluationsButton from "../components/RunEvaluationsButton";

const QueuePage = () => {
  const { queueId } = useParams<{ queueId: string }>();
  const { queue, questions, loading } = useQueueDetails(queueId);
  const [runningEval, setRunningEval] = useState<boolean>(false);

  const navigate = useNavigate();
  if (!queueId || (!queue && !loading)) {
    return (
      <div className="p-4 text-gray-500">
        Queue Does Not Exist. Attempted Id: {queueId}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full dark:bg-gray-900 dark:text-white flex flex-col">
      {loading || runningEval ? (
        <div className="flex items-center justify-center h-full">
          <LoadingState 
            message={loading ? "Fetching Queue..." : "Running Evaluations..."} 
          />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col">
          <div className="flex flex-row justify-between">
            <h1 className="text-xl mx-5">{queueId}</h1>
            <button onClick={() => navigate("/")}>

            </button>
          </div>

          {queueId && (
            <QuestionListComponent 
              setLoading={setRunningEval} 
              queueId={queueId} 
              questions={questions} 
            />
          )}
        </div>
      )}
    </div>
  );
};

export default QueuePage;
