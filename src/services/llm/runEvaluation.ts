import { fetchEvaluationData } from "../supabase/fetchData";
import { supabase } from "../supabase/supabase";
import { saveEvaluations } from "../supabase/evaluations";
export const runEvaluations = async (queueId: string) => {
  try {
    const { tasks } = await fetchEvaluationData(queueId);

const { data, error } = await supabase.functions.invoke("runAIEvaluations", {
  body: { tasks } // shorthand for { tasks: tasks }
});

    if(error){
      throw new Error
    }

    console.log(data)
    await saveEvaluations(data);

  } catch (error) {
    alert(error);
  }
};
