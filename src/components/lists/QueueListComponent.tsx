import React, {useState, useEffect} from "react";
import type { Submission } from "../../types/types";
import QueueCard from "../cards/QueueCard";

interface SubmissionProps{
  queues: Submission[]
}
const QueueList = ({queues}: SubmissionProps) => {
  if (!queues || queues.length === 0) {
    return <div className="p-4 text-gray-500">No queues to display.</div>;
  }


  return (
    <div className="space-y-4 grid grid-col-5">
      {queues.map((queue) => (
        <QueueCard queue={queue}></QueueCard>
      ))}
    </div>
  );
};

export default QueueList;
