import React from "react";

interface StatsCardProps {
  label: string;
  value: number | string;
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow w-48 text-center">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
};

export default StatsCard;
