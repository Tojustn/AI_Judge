import { useState } from "react";
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
      <UploadSection />

      <QueueSection
        queues={queues}
        loading={queuesLoading}
        error={queuesError}
      />

      <JudgesSection
        judges={judges}
        loading={loadingJudges}
        onAddJudge={handleAddJudge}
      />

      <Modal isOpen={judgeCard} onClose={handleCloseJudgeCard}>
        <AddJudgeCard changeState={setJudgeCard} />
      </Modal>
      <div className="flex flex-col justify-center">
        <RunEvaluationsButton />
      </div>
    </div>
  );
};

export default InitialState;
