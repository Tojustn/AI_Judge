import type { JSONSubmission, JSONSubmissions } from "../types/types";

export const checkFileType = (file: File) => {
  const name = file.name || "";
  const extension = name.includes(".") ? name.split(".").pop() : "";
  const mime = (file.type || "").toLowerCase();

  // Some browsers set empty type for .json from drag/drop; accept based on extension
  const isJsonMime = mime === "application/json" || mime === "text/json";
  const isJsonExt = (extension || "").toLowerCase() === "json";

  return isJsonMime || isJsonExt;
};

export const parseFile = async (
  file: File
): Promise<JSONSubmission | JSONSubmissions> => {
  try {
    const fileText = await file.text();
    const parsed = JSON.parse(fileText);
    if (Array.isArray(parsed)) {
      return parsed as JSONSubmissions;
    }
    return parsed as JSONSubmission;
  } catch (error) {
    alert(error instanceof Error ? error.message : String(error));
    throw error;
  }
};
