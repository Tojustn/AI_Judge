import type { Evaluation, Judge } from "../types/types";

export const getJudgeAndQuestionOptions = (
  evaluations: Evaluation[],
  judges: Judge[]
) => {
  const judgeMap = new Map<string, string>();
  evaluations.forEach(e => {
    const judge = judges.find(j => j.id === e.judgeId);
    if (judge) judgeMap.set(judge.id, judge.name);
  });

  const judgeOptions = Array.from(judgeMap, ([id, name]) => ({ id, name }));

  const questionOptions = Array.from(
    new Set(
      evaluations
        .map(e => e.questionId)
        .filter((q): q is string => Boolean(q))
    )
  );

  return { judgeOptions, questionOptions };
};
