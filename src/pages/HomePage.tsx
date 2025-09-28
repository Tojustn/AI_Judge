
import { useState } from "react";
import UploadSection from "../components/sections/UploadSection";
import QueueSection from "../components/sections/QueueSection";
import JudgesSection from "../components/sections/JudgesSection";
import Modal from "../components/Modal";
import AddJudgeCard from "../components/cards/AddJudgeCard";
import { useJudges } from "../context/JudgesContext";
import { useQueues } from "../hooks/useQueues";
const HomePage = () => {
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
    <div className="relative w-full min-h-screen flex flex-col gap-5 px-6 py-8 bg-gray-50 dark:bg-gray-900 overflow-auto">
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
    </div>
  );
};

export default HomePage;
