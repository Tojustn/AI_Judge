import React from "react";
import { useJudges } from "../../context/JudgesContext";
import type { Evaluation } from "../../types/types";

interface ResultsTableProps {
  evaluations: Evaluation[];

}

const ResultsTable = ({ evaluations }: ResultsTableProps) => {
  const {judges}  = useJudges()
const verdictColor = (verdict: Evaluation["verdict"]) => {
  switch (verdict) {
    case "pass":
      return "text-green-600 dark:text-green-400";
    case "fail":
      return "text-red-600 dark:text-red-400";
    default:
      return "text-yellow-600 dark:text-yellow-400"; // pending or null
  }
};

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
      <table className="min-w-full table-auto">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left">Submission</th>
            <th className="px-4 py-2 text-left">Question</th>
            <th className="px-4 py-2 text-left">Judge</th>
            <th className="px-4 py-2 text-left">Verdict</th>
            <th className="px-4 py-2 text-left">Reasoning</th>
            <th className="px-4 py-2 text-left">Created</th>
          </tr>
        </thead>
     
     <tbody>
  {evaluations.map((evaluation) => {
    const judgeName =
      judges.find((j) => j.id === evaluation.judgeId)?.name ??
      evaluation.judgeId;

    return (
      <tr
        key={`${evaluation.submissionId}-${evaluation.questionId}-${evaluation.judgeId}`}
        className="border-t border-gray-300 dark:border-gray-700"
      >
        <td className="px-4 py-2">{evaluation.submissionId ?? "-"}</td>
        <td className="px-4 py-2">{evaluation.questionId ?? "-"}</td>
        <td className="px-4 py-2">{judgeName}</td>
        <td
          className={`px-4 py-2 font-semibold ${verdictColor(
            evaluation.verdict
          )}`}
        >
          {evaluation.verdict ?? "pending"}
        </td>
        <td className="px-4 py-2">{evaluation.reasoning ?? "-"}</td>
        <td className="px-4 py-2">{evaluation.createdAt}</td>
      </tr>
    );
  })}
</tbody>

      </table>
    </div>
  );
};

export default ResultsTable;
