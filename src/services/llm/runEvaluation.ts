import { fetchEvaluationData } from "../supabase/fetchData";
import { supabase } from "../supabase/supabase";
import { saveEvaluations } from "../supabase/evaluations";

export const runEvaluations = async (queueId: string) => {
  try {
    const { tasks } = await fetchEvaluationData(queueId);

    const { data, error } = await supabase.functions.invoke("runAIEvaluations", {
      body: { tasks }
    });

    if (error) {
      throw new Error(error.message);
    }

    const summaryText = `AI Evaluation Summary:
    Planned:   ${data.summary.planned}
    Completed: ${data.summary.completed}
    Failed:    ${data.summary.failed}`;

    alert(summaryText);
    await saveEvaluations(data.results);

  } catch (err) {
    console.error("Error running evaluations:", err);
    throw err;
  }
};
