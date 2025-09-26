import React from "react";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface Judge {
  id: string;
  createdAt: number;
  rubric: string;
  targetModelName: string;
  active: boolean;
  name: string;
}

export interface Question {
  id: string;
  rev: number;
  submissionId: string;
  questionType: string;
  questionText: string;
}

export interface Answer {
  id: string;
  questionId: string;
  choice: string;
  reasoning?: string;
}

export interface Submission {
  id: string;
  createdAt: number;
  labelingTaskId: string;
  queueId: string;
}

export interface JudgesQuestionsAssignment {
  judgeId: string;
  questionId: string;
}

export interface JSONSubmission {
  id: string;
  queueId: string;
  labelingTaskId: string;
  createdAt: number;
  questions: {
    rev: number;
    data: Question;
  }[];
  answers: {
    [questionId: string]: Answer;
  };
}

export interface QueueListType {
  id: string;
  name: string;
}
// multiple submissions
export type JSONSubmissions = JSONSubmission[];

export type AppState = "initial" | "running-evaluations" | "viewing-results";

export type TargetModelName =
  | "gpt-4"
  | "gpt-3.5-turbo"
  | "claude-v1"
  | "llama-2-7b";


  export const targetModels: TargetModelName[] = [
  "gpt-4",
  "gpt-3.5-turbo",
  "claude-v1",
  "llama-2-7b",
];