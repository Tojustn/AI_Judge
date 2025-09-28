import React from "react";
import { Button } from "../common/Button";
import { runEvaluations } from "../../services/llm/runEvaluation";
import { useNavigate } from "react-router-dom";

interface RunEvaluationsProp {
  queueId: string;
  setLoading: (loading: boolean) => void;
}
const RunEvaluationsButton = ({ queueId, setLoading}: RunEvaluationsProp) => {
  const navigate = useNavigate();
  const RunEvaluations = async () => {
    setLoading(true)
    try{
      await runEvaluations(queueId);
      navigate("/results")
    }
    catch(error){
      alert(error)
      setLoading(false)
    }
    setLoading(false)
  };
  const EvaluationButtonStyle =
    "px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1";
  return (
    <Button className={EvaluationButtonStyle} onClick={RunEvaluations}>
      Run All Judges
    </Button>
  );
};

export default RunEvaluationsButton;
