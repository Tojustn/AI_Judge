import { useState } from "react";
import UploadSection from "../components/upload/UploadSection";
import QueueSection from "../components/queue/QueueSection";
import JudgesSection from "../components/judge/JudgesSection";
import Modal from "../components/common/Modal";
import AddJudgeCard from "../components/judge/AddJudgeCard";
import { useJudges } from "../context/JudgesContext";
import { useQueues } from "../hooks/useQueues";
import type { Queue } from "../types/types";
const HomePage = () => {
  const [judgeCard, setJudgeCard] = useState<boolean>(false);
  const { judges, setJudges, loadingJudges } = useJudges();
  const { queues, setQueues, loading: queuesLoading, error: queuesError } = useQueues();


  const handleAddJudge = () => {
    setJudgeCard(true);
  };

  const handleCloseJudgeCard = () => {
    setJudgeCard(false);
  };

  const handleDeleteQueue = (id: string) => {
    setQueues(prev => prev.filter(q => q.id !== id));
  };

const handleUploadSuccess = (newQueues: Queue[]) => {
  if (!newQueues) return; 

  setQueues((prev) => {
    const uniqueNewQueues = newQueues.filter(
      (q) => !prev.some((existing) => existing.id === q.id)
    );
    return [...prev, ...uniqueNewQueues];
  });
};


  return (
    <div className="relative w-full min-h-screen flex flex-col gap-5 px-6 py-8 bg-gray-50 dark:bg-gray-900 overflow-auto">
      <UploadSection onUpload={handleUploadSuccess}/>

      <QueueSection
        queues={queues}
        loading={queuesLoading}
        error={queuesError}
        onDelete={handleDeleteQueue}
      />

      <JudgesSection
        judges={judges}
        loading={loadingJudges}
        onDelete={(judge) => setJudges(prev => prev.filter(j => j.id !== judge))} 
        onAddJudge={handleAddJudge}
      />

      <Modal isOpen={judgeCard} onClose={handleCloseJudgeCard}>
        <AddJudgeCard changeState={setJudgeCard} />
      </Modal>
    </div>
  );
};

export default HomePage;
