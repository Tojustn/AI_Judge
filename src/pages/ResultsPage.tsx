import { useState, useEffect, useMemo } from "react";
import { useResults } from "../hooks/useResults";
import LoadingState from "../components/common/LoadingState";
import StatsCard from "../components/results/StatsCard";
import ResultsTable from "../components/results/ResultsTable";
import Filters from "../components/results/Filters";
import { type Verdict } from "../types/types";
import { getJudgeAndQuestionOptions } from "../services/getOptions";
import { useJudges } from "../context/JudgesContext";
import PieChart from "../components/results/chart/PieChart";
const ResultsPage = () => {
  const { judges } = useJudges();
  const { evaluations, loading } = useResults();
  
  // Use useMemo to prevent recreating options on every render
  const { judgeOptions, questionOptions } = useMemo(() => 
    getJudgeAndQuestionOptions(evaluations, judges),
    [evaluations, judges]
  );
  
  const [judgeFilter, setJudgeFilter] = useState<string[]>([]);
  const [questionFilter, setQuestionFilter] = useState<string[]>([]);
  const [verdictFilter, setVerdictFilter] = useState<Verdict[]>(["pass", "fail", "inconclusive"]);
  
  // Initialize filters when options are available
  useEffect(() => {
    if (judgeOptions.length > 0) {
      setJudgeFilter(judgeOptions.map(j => j.id));
    }
  }, [judgeOptions]);

  useEffect(() => {
    if (questionOptions.length > 0) {
      setQuestionFilter(questionOptions);
    }
  }, [questionOptions]);
  
  const filteredEvaluations = useMemo(() => 
    evaluations.filter(
      (e) =>
        e.judgeId !== null &&
        e.questionId !== null &&
        e.verdict !== null &&
        judgeFilter.includes(e.judgeId) &&
        questionFilter.includes(e.questionId) &&
        verdictFilter.includes(e.verdict)
    ),
    [evaluations, judgeFilter, questionFilter, verdictFilter]
  );

  if (loading) {
    return (
      <div className="p-6 min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <LoadingState message="Fetching Results..." />
      </div>
    );
  }

  const total = filteredEvaluations.length;
  const passRate = total > 0 ? Math.round(
    (filteredEvaluations.filter((e) => e.verdict === "pass").length / total) * 100
  ) : 0;
  const failed = filteredEvaluations.filter((e) => e.verdict === "fail").length;


  return (
    <div className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Evaluation Results</h1>
      
      <div className="flex flex-row gap-6 items-center">
  <div className="flex flex-row gap-4">
    <StatsCard label="Total Evaluations" value={total} />
    <StatsCard label="Pass Rate" value={`${passRate}%`} />
    <StatsCard label="Failed" value={failed} />
  </div>

  <div className="w-60 h-60">
    <PieChart
      verdictCounts={{
        pass: filteredEvaluations.filter(e => e.verdict === "pass").length,
        fail: filteredEvaluations.filter(e => e.verdict === "fail").length,
        inconclusive: filteredEvaluations.filter(e => e.verdict === "inconclusive").length,
      }}
    />
  </div>
</div>

      <Filters         
        evaluations={evaluations}
        judgeFilter={judgeFilter}
        setJudgeFilter={setJudgeFilter}
        questionFilter={questionFilter}
        setQuestionFilter={setQuestionFilter}
        verdictFilter={verdictFilter}
        setVerdictFilter={setVerdictFilter}
        judgeOptions={judgeOptions}
        questionOptions={questionOptions}
      />
      {!filteredEvaluations || filteredEvaluations.length === 0 ? (
        <div className="p-6 min-h-screen flex  justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
          No Results Found
        </div>
      ) : (
        <ResultsTable evaluations={filteredEvaluations} />
      )}

    </div>
  );
};

export default ResultsPage