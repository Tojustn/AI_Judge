import type { Judge } from "../../types/types";
import { JudgeCard } from "../cards/JudgeCard";

interface JudgesListProp {
  judges: Judge[];
}
const JudgeListComponent = ({ judges }: JudgesListProp) => {
  if (!judges || judges.length === 0) {
    return <div className="p-4 text-gray-500">No queues to display.</div>;
  }

  return (
    <div className="grid grid-cols-5">
      {judges.map((judge) => (
        <JudgeCard key={judge.id} judge={judge} />
      ))}
    </div>
  );
};

export default JudgeListComponent;
