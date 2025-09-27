import { Button } from "./Button";
import { saveQuestionsToJudges } from "../services/supabase/judgestoquestions";
import { useNavigate } from "react-router-dom";

interface SaveAssignmentsButtonProps {
  assignments: Map<string, string[]>;
}

const SaveAssignmentsButton: React.FC<SaveAssignmentsButtonProps> = ({
  assignments,
}) => {
  const navigate = useNavigate();
  const saveAssignments = async () => {
    try {
      await saveQuestionsToJudges(assignments);
      alert("Successfully Assigned Judges");
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };

  return <Button onClick={saveAssignments}>Save All Assignments</Button>;
};

export default SaveAssignmentsButton;
