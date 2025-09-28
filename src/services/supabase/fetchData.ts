import {  getAnswersByMultipleQuestionIds, getAnswersByQuestionId} from "./answers";
import { getJudgeAssignmentsByQueue } from "./judgestoquestions";
import { targetModelMap, type Answer } from "../../types/types";

export const fetchEvaluationData = async (queueId: string) => {
  const assignments = await getJudgeAssignmentsByQueue(queueId);

  if(!assignments || assignments.length === 0){
    throw new Error("No Question to Judge Assignments")
  }
  const questionIds = [...new Set(assignments.map((a) => a.questionId))];

  const allAnswers = await getAnswersByMultipleQuestionIds(questionIds);

  // Initialize an empty object to store answers grouped by question ID
  const answersByQuestion: { [questionId: string]: Answer[] } = {};

  for (const answer of allAnswers) {
    const questionId = answer.questionId;
    if (!answersByQuestion[questionId]) {
      answersByQuestion[questionId] = [];
    }
    answersByQuestion[questionId].push(answer);
  }

  const tasks = [];
  // make tasks for each answer to a question
  for (const assignment of assignments) {
    console.log(assignment)

    const questionAnswers = answersByQuestion[assignment.questionId] || [];

    if (!targetModelMap.get(assignment.judges.targetModelName)) {
      console.log(assignment.judges)
      throw new Error("Provider does not exist");
    }
    const provider = targetModelMap.get(assignment.judges.targetModelName)!.provider;

    for (const answer of questionAnswers) {
      tasks.push({
        submissionId: answer.submissionId,
        question: assignment.questions,
        answer: answer,
        judge: assignment.judges,
        model: provider,
      });
    }
  }

  console.log(tasks)
  return { tasks };
};
