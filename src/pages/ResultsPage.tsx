
import React from "react";
import { useResults } from "../hooks/useResults";
import LoadingState from "../components/LoadingState";

const ResultsPage = () => {
  const { evaluations, loading } = useResults();

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <LoadingState message="Fetching Results..." />
      </div>
    );
  }
  else if(!evaluations || evaluations.length === 0){
    return (
     <div className="p-6 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        No Results Found
      </div> 
    )
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Evaluation Results</h1>

      <div className="flex gap-6 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-48 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Total Evaluations
          </div>
          <div className="text-xl font-semibold">{evaluations.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-48 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Pass Rate</div>
          <div className="text-xl font-semibold">
            {evaluations.length > 0
              ? Math.round(
                  (evaluations.filter((e) => e.verdict === "pass").length /
                    evaluations.length) *
                    100
                )
              : 0}
            %
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-48 text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">Failed</div>
          <div className="text-xl font-semibold">
            {evaluations.filter((e) => e.verdict === "fail").length}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <select className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option>Filter by Judge</option>
        </select>
        <select className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option>Filter by Question</option>
        </select>
        <select className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option>Filter by Verdict</option>
        </select>
      </div>

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
            {evaluations.map((e) => (
              <tr
                key={`${e.submissionId}-${e.questionId}-${e.judgeId}`}
                className="border-t border-gray-300 dark:border-gray-700"
              >
                <td className="px-4 py-2">{e.submissionId}</td>
                <td className="px-4 py-2">{e.questionText}</td>
                <td className="px-4 py-2">{e.judgeName}</td>
                <td
                  className={`px-4 py-2 font-semibold ${
                    e.verdict === "pass"
                      ? "text-green-600 dark:text-green-400"
                      : e.verdict === "fail"
                      ? "text-red-600 dark:text-red-400"
                      : "text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {e.verdict}
                </td>
                <td className="px-4 py-2">{e.reasoning}</td>
                <td className="px-4 py-2">{e.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsPage;