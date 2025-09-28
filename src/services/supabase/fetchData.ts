import { getAnswersByQuestionId} from "./answers";
import { getJudgeAssignmentsByQueue } from "./judgestoquestions";
import { targetModelMap  } from "../../types/types";

export const fetchEvaluationData = async (queueId: string) => {
  const assignments = await getJudgeAssignmentsByQueue(queueId);
  
  if (!assignments || assignments.length === 0) {
    throw new Error("No Question to Judge Assignments");
  }

  const tasks = [];
  
  for (const assignment of assignments) {
    // Get the single answer for this question
    const answers = await getAnswersByQuestionId(assignment.questionId, queueId);
    
    if (answers.length === 0) continue; // Skip if no answer
    
    const provider = targetModelMap.get(assignment.judges.targetModelName)?.provider;
    if (!provider) throw new Error("Provider does not exist");
    
    // Since there's only one answer per question, just use the first one
    const answer = answers[0];
    
    tasks.push({
      submissionId: answer.submissionId,
      question: assignment.questions,
      answer,
      judge: assignment.judges,
      model: provider,
    });
  }

  return { tasks };
};