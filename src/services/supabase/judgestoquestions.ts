import { supabase } from "./supabase";

export const saveQuestionsToJudges = async (
  assignments: Map<string, string[]>
) => {
  const records: { queueId: string; questionId: string; judgeId: string }[] =
    [];

  assignments.forEach((judgeIds: string[], key: string) => {
    const [queueId, questionId] = JSON.parse(key);
    deletePairsByQuestion(questionId);
    for (let i = 0; i < judgeIds.length; i++) {
      records.push({
        queueId,
        questionId,
        judgeId: judgeIds[i],
      });
    }
  });

  console.log(records);
  const { error } = await supabase
    .from("JudgesQuestionsAssignment")
    .upsert(records);

  if (error) {
    throw new Error(error.message);
  }
};

export const deletePairsByQuestion = async (questionId: string) => {
  const { error } = await supabase
    .from("JudgesQuestionsAssignment")
    .delete()
    .eq("questionId", questionId);

  if (error) {
    throw new Error("Error Deleting Pairs");
  }
};
