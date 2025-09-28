import JudgeListComponent from "./JudgeListComponent";
import LoadingState from "../common/LoadingState";
import { Button } from "../common/Button";
import type { Judge } from "../../types/types";

interface JudgesSectionProps {
  judges: Judge[];
  loading: boolean;
  onAddJudge: () => void;
  onDelete: (id: string) => void;
}

const JudgesSection = ({ judges, loading, onAddJudge, onDelete}: JudgesSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <div className="flex flex-row justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Current Judges
        </h2>
        <Button onClick={onAddJudge}>Add Judge</Button>
      </div>

      {loading ? (
        <LoadingState message="Loading Judges" />
      ) : (
        <JudgeListComponent judges={judges} onDelete={onDelete} />
      )}
    </div>
  );
};

export default JudgesSection;
