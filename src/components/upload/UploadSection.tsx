import FileUploadComponent from "./FileUploadComponent";
import {type Queue} from "../../types/types";

interface UploadSectionProps {
  onUpload: (newQueue: Queue[]) => void;
}
const UploadSection = ({onUpload}: UploadSectionProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Upload Submissions
      </h2>
      <FileUploadComponent onUpload={onUpload}/>
    </div>
  );
};

export default UploadSection;
