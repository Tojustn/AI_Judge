import { Button } from "../common/Button";
import { saveQuestionsToJudges } from "../../services/supabase/judgestoquestions";

interface SaveAssignmentsButtonProps {
  assignments: Map<string, string[]>;
}

const SaveAssignmentsButton: React.FC<SaveAssignmentsButtonProps> = ({
  assignments,
}) => {
  const saveAssignments = async () => {
    try {
      await saveQuestionsToJudges(assignments);
      alert("Successfully Assigned Judges");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Button
      className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md 
             hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 
             focus:ring-green-400 focus:ring-offset-1"
      onClick={saveAssignments}
    >
      Save Assignments
    </Button>
  );
};

export default SaveAssignmentsButton;
