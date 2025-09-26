import { createContext, useContext, useState, ReactNode } from "react";
import type { AppState } from "../types/types";

type AppStateContextType = {
  appState: AppState;
  setAppState: (state: AppState) => void;
};

const AppStateContext = createContext<AppStateContextType | undefined>(
  undefined
);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [appState, setAppState] = useState<AppState>("initial");

  return (
    <AppStateContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppStateProvider");
  }
  return context;
};
