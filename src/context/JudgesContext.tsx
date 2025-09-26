import { createContext, useContext, useState, useEffect } from "react";
import type { Judge } from "../types/types";
import type { ReactNode } from "react";
import { getActiveJudges } from "../services/supabase/judges";

interface JudgeContextProps {
  judges: Judge[];
  loadingJudges: boolean;
  error: string | null;
}

// Need to provide a default value or use undefined
export const JudgesContext = createContext<JudgeContextProps | undefined>(undefined);

export const JudgesProvider = ({ children }: { children: ReactNode }) => {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loadingJudges, setLoadingJudges] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchJudges = async () => {
      try {
        setLoadingJudges(true);
        const data = await getActiveJudges(); // Missing parentheses!
        setJudges(data);
        setError("");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load judges';
        setError(errorMessage);
        console.error('Error fetching judges:', err);
      } finally {
        setLoadingJudges(false);
      }
    };
    
    fetchJudges();
  }, []);

  // Return statement was inside fetchJudges - moved outside!
  return (
    <JudgesContext.Provider value={{ judges, loadingJudges, error }}>
      {children}
    </JudgesContext.Provider>
  );
};

export const useJudges = () => {
  const context = useContext(JudgesContext);
  if (!context) {
    throw new Error("useJudges must be used within a JudgesProvider");
  }
  return context;
};