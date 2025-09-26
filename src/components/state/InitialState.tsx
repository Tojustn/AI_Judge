import React, { useState } from "react";
import UploadSection from "../sections/UploadSection";
import QueueSection from "../sections/QueueSection";
import JudgesSection from "../sections/JudgesSection";
import Modal from "../Modal";
import AddJudgeCard from "../cards/AddJudgeCard";
import RunEvaluationsButton from "../RunEvaluationsButton";
import { useJudges } from "../../context/JudgesContext";
import { useQueues } from "../../hooks/useQueues";
const InitialState = () => {
  const [judgeCard, setJudgeCard] = useState<boolean>(false);
  const { judges, loadingJudges } = useJudges();
  const { queues, loading: queuesLoading, error: queuesError } = useQueues();

  const handleAddJudge = () => {
    setJudgeCard(true);
  };

  const handleCloseJudgeCard = () => {
    setJudgeCard(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col gap-8 px-6 py-8 bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Upload Submissions
        </h2>
        <FileUploadComponent />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Queue List
        </h2>
        {queuesLoading ? (<LoadingState message = "Loading Queues"></LoadingState>) : 
        (<QueueList queues={queues} />
        )}
      </div>


<div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
  <div className="flex flex-row justify-between">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
      Current Judges
    </h2>
    <Button onClick={handleAddJudge}>Add Judge</Button>
  </div>
  
  {loadingJudges ? (
    <LoadingState message="Loading Judges" />
  ) : (
    <JudgeListComponent judges={judges} />
  )}
</div>

      {judgeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center dark:bg-black bg-opacity-80">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-[500px] max-w-[90%] relative">
            <button
              onClick={handleCloseJudgeCard}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✕
            </button>

            <AddJudgeCard changeState = {setJudgeCard}/>
          </div>
        </div>
      )}
      <div className = " flex flex-col justify-center">
      <RunEvaluationsButton></RunEvaluationsButton>
      </div>
    </div>
  );
};

export default InitialState;
