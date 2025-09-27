import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ResultsPage from "./pages/ResultsPage";
import QueuePage from "./pages/QueuePage";
import { JudgesProvider } from "./context/JudgesContext";
const App = () => {
  return (
    <BrowserRouter>
      <JudgesProvider>
        <div className="">
          <Routes>
            <Route path="/queues/:queueId" element={<QueuePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </JudgesProvider>
    </BrowserRouter>
  );
};

export default App;
