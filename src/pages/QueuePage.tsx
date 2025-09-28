import QuestionListComponent from "../components/question/QuestionListComponent";
import { useParams } from "react-router-dom";
import { useState } from "react";
import LoadingState from "../components/common/LoadingState";
import { useQueueDetails } from "../hooks/useQueueDetails";
import { useNavigate } from "react-router-dom";

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
      <div className="flex-1 flex items-center justify-center">
        <LoadingState 
          message={loading ? "Fetching Queue..." : "Running Evaluations..."} 
        />
      </div>
    ) : (
      <div className="flex-1 flex flex-col">
        <div className="flex flex-row justify-between px-5 py-3">
          <h1 className="text-xl">{queueId}</h1>
          <button onClick={() => navigate("/")}>Back</button>
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
