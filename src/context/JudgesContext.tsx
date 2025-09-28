import { createContext, useContext, useState, useEffect } from "react";
import type { Judge } from "../types/types";
import type { ReactNode } from "react";
import { getJudges } from "../services/supabase/judges";

interface JudgeContextProps {
  judges: Judge[];
  setJudges: React.Dispatch<React.SetStateAction<Judge[]>>;
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
        const data = await getJudges();
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

  return (
    <JudgesContext.Provider value={{ judges, setJudges, loadingJudges, error }}>
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