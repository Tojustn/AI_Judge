import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import QueuePage from "./pages/QueuePage";
import { AppStateProvider } from "./context/AppStateContext";
const App = () => {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <div className="min-h-screen w-full min-w-full">
          <Routes>
            <Route path="/queues/:queueId" element={<QueuePage/>} />
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </AppStateProvider>
    </BrowserRouter>
  );
};

export default App;
