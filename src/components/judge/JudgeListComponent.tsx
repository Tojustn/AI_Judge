import type { Judge } from "../../types/types";
import { JudgeCard } from "./JudgeCard";

interface JudgesListProp {
  judges: Judge[];
  onDelete: (id: string) => void;
}
const JudgeListComponent = ({ judges, onDelete }: JudgesListProp) => {
  if (!judges || judges.length === 0) {
    return <div className="p-4 text-gray-500">No queues to display.</div>;
  }

  return (
    <div className="grid grid-cols-5">
      {judges.map((judge) => (
        <JudgeCard key={judge.id} judge={judge} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default JudgeListComponent;
