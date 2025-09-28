import type { Question } from "../../types/types";
import { SubmissionCard } from "./SubmissionCard";
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
  const availableJudges = judges.filter(j => j.active);
  const { assignments, updateAssignment, loading } = useQuestionAssignments(
    queueId,
    questions
  );

  if (loading)
    return <LoadingState message="Loading Assignments... "></LoadingState>;

  if (!questions || questions.length === 0)
    return <div>No questions to display.</div>;

  // Group questions by submission ID
  const questionsBySubmission = questions.reduce((acc, question) => {
    const submissionId = question.submissionId;
    if (!acc[submissionId]) {
      acc[submissionId] = [];
    }
    acc[submissionId].push(question);
    return acc;
  }, {} as Record<string, Question[]>);

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-6">
        {Object.entries(questionsBySubmission).map(([submissionId, submissionQuestions]) => (
          <SubmissionCard
            key={submissionId}
            submissionId={submissionId}
            questions={submissionQuestions}
            judges={availableJudges}
            assignments={assignments}
            updateAssignment={updateAssignment}
            queueId={queueId}
          />
        ))}
      </div>
      
      <div className="flex gap-4 m-5">
        <SaveAssignmentsButton assignments={assignments} />
        <RunEvaluationsButton queueId={queueId} setLoading={setLoading}/>
      </div>
    </div>
  );
};

export default QuestionListComponent;