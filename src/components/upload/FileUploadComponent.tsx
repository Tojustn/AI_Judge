import React, { useState } from "react";
import { handleFileUpload } from "../../services/utils/uploadFile";
import { checkFileType } from "../../services/utils/fileUtils";
import { Button } from "../common/Button";
import { Upload } from "lucide-react";
import LoadingState from "../common/LoadingState";
import { type Queue } from "../../types/types";

interface FileUploadComponentProps {
  onUpload: (newQueues: Queue[]) => void;
}
const FileUploadComponent = ({onUpload}: FileUploadComponentProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selectedFile = input.files && input.files[0];
    setFile(selectedFile);
  };

  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      setLoading(true);
    try {
      if (!file) {
        throw new Error("Please select a file to upload.");
      }
      if (!checkFileType(file)) {
        setFile(null);
        throw new Error("Invalid file type. Please upload a .json file.");
      }
      const queueIds = await handleFileUpload(file);
      const queuesWithCreatedAt: Queue[] = Array.isArray(queueIds)
        ? queueIds.map(id => ({ id, createdAt: Date.now() }))
        : [];
      onUpload(queuesWithCreatedAt);

    } catch (error) {
      alert(error);
    }
      setLoading(false)
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoadingState message="Uploading File"/>
      </div>
    );
  }

  return (
    <div>
      <form
        onSubmit={handleFileSubmit}
        className="m-6 p-6 flex flex-col space-y-4 bg-gray-100 dark:bg-slate-600 rounded-xl"
      >
        <h1 className="text-xl">
          <strong>Upload JSON File</strong>
        </h1>
        <input
          type="file"
          accept="application/json,.json"
          onChange={handleFileChange}
        ></input>
        <Button type="submit">
          <div className="flex flex-row gap-2">
            <Upload />
            Upload File
          </div>
        </Button>
      </form>
    </div>
  );
};

export default FileUploadComponent;
