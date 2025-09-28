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
  queueId: string;
  questionType: string;
  questionText: string;
  submissionId: string;
}

export interface Answer {
  id: string; // uuid type in database
  questionId: string;
  choice: string;
  reasoning?: string;
  queueId: string;
  submissionId: string;
}

export interface Queue {
  id: string;
  createdAt?: number;
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
  queueId: string;
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
  | "gpt-o4 mini"
  | "claude-v1"
  | "llama-2-7b";

export type LLMModel = {
  name: string;
  provider: "openai" | "anthropic" | "local";
  id: TargetModelName;
};

export const targetModelMap = new Map<
  string,
  { name: string; provider: string }
>([
  ["gpt-4", { name: "GPT-4", provider: "openai" }],
  ["gpt-4o-mini", { name: "GPT-4o mini", provider: "openai" }],
  ["claude-v1", { name: "Claude v1", provider: "anthropic" }],
  ["gemini-1", { name: "Gemini 1", provider: "gemini" }]

]);

export const targetModelsArray = [
  { id: "gpt-4", name: "GPT-4", provider: "openai" },
  { id: "gpt-4o-mini", name: "GPT-4o mini", provider: "openai" },
  { id: "claude-v1", name: "Claude v1", provider: "anthropic" },
  {id: "gemini-1", name: "Gemini 1", provider: "gemini"}
];

export interface Evaluation {
  id: number;        
  createdAt: string;        
  judgeId: string | null;     
  questionId: string | null; 
  submissionId: string | null;
  verdict: Verdict | null;    
  reasoning: string | null;
  questionText: string | null;
  answerText: string | null;
}


export type Verdict = 
  | "pass" 
  | "fail" 
  | "inconclusive"; 

  export interface AIResponse {
  success: boolean;           
  content: string;
  taskId: string;                
  judgeId: string;               
  }