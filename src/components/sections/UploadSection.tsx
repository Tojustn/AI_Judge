import FileUploadComponent from "../FileUploadComponent";

const UploadSection = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Upload Submissions
      </h2>
      <FileUploadComponent />
    </div>
  );
};

export default UploadSection;
