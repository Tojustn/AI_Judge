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

export const getJudgeAssignments = async () => {
  const { data, error } = await supabase.from("answers").select("*");

  if (error) {
    throw new Error(error.message || "Failed to fetch questions");
  }

  return data;
};

export const getJudgeAssignmentsByQueue = async (queueId: string) => {
  // Join the assignments table to the judges and question table

  // SPecify that im using the questionId fk cuz both point to a question
  const { data, error } = await supabase
    .from("JudgesQuestionsAssignment")
    .select(
      `
      *,
      judges(
        id,
        name,
        rubric,
        targetModelName,
        active
      ),
      questions!JudgesQuestionsAssignment_questionId_queueId_fkey (
        id,
        questionText,
        questionType,
        submissionId
      )
    `
    )
    .eq("queueId", queueId);

  if (error) {
    throw new Error(`Failed to fetch judge assignments: ${error.message}`);
  }
  return data || [];
};
