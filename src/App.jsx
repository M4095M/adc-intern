import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/page-1/Welcome";
import Challenges from "./pages/page-2/Challenges";
import Leaderboard from "./pages/page-3/Leaderboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Challenges" element={<Challenges />} />
        <Route path="/Leaderboard" element={<Leaderboard c="0" />} />
        <Route path="/Leaderboard-1" element={<Leaderboard c="1" />} />
        <Route path="/Leaderboard-2" element={<Leaderboard c="2" />} />
        <Route path="/Leaderboard-3" element={<Leaderboard c="3" />} />
        <Route path="/Leaderboard-4" element={<Leaderboard c="4" />} />

      </Routes>
    </Router>
  );
}

export default App;
