import type { Question } from "../../types/types";
import { QuestionCard } from "./QuestionCard";
import { useQuestionAssignments } from "../../hooks/useQuestionAssignments";
import SaveAssignmentsButton from "../queue/SaveAssignmentsButton";
import RunEvaluationsButton from "../queue/RunEvaluationsButton";
import { useJudges } from "../../context/JudgesContext";
import LoadingState from "../common/LoadingState";

interface QuestionListProps {
  queueId: string;
  questions: Question[];
  setLoading: (loading: boolean) => void;
}

const QuestionListComponent = ({ queueId, questions, setLoading}: QuestionListProps) => {
  const { judges } = useJudges();

  const { assignments, updateAssignment, loading } = useQuestionAssignments(
    queueId,
    questions
  );

  if (loading)
    return <LoadingState message="Loading Assignments... "></LoadingState>;
  if (!questions || questions.length === 0)
    return <div>No questions to display.</div>;

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="grid grid-cols-5 gap-4">
        {questions.map((question) => {
          const key = JSON.stringify([queueId, question.id]);
          const selectedJudges = assignments.get(key) || [];

          return (
            <QuestionCard
              key={question.id}
              question={question}
              judges={judges}
              selectedJudges={selectedJudges}
              onAssignmentChange={(questionId: string, judgeIds: string[]) => {
                // we already know the questionId, so just use it
                updateAssignment(questionId, judgeIds);
              }}
            />
          );
        })}
      </div>

      <div className="flex gap-4 mt-4">
        <SaveAssignmentsButton assignments={assignments} />
        <RunEvaluationsButton queueId={queueId} setLoading={setLoading}/>
      </div>
    </div>
  );
};

export default QuestionListComponent;
