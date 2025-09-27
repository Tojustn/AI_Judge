import React, { useState } from "react";
import { handleFileUpload } from "../services/uploadFile";
import { checkFileType } from "../services/fileUtils";
import { Button } from "./Button";
import { Upload } from "lucide-react";

const FileUploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const selectedFile = input.files && input.files[0];
    setFile(selectedFile);
  };

  const handleFileSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!file) {
        throw new Error("Please select a file to upload.");
      }
      if (!checkFileType(file)) {
        setFile(null);
        throw new Error("Invalid file type. Please upload a .json file.");
      }
      await handleFileUpload(file);

      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

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
