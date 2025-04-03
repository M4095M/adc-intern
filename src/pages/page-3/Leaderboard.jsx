import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Leaderboard.css"; // Make sure styles are correct in this file
import NavBar from "../../Navbar";

const challengesList = {
  "1": "https://leaderboardadc-copy3.onrender.com",
  "2": "https://leaderboardadc-copy3.onrender.com",
  "3": "https://leaderboardadc-copy3.onrender.com",
  "4": "https://leaderboardadc-copy3.onrender.com",
  "5": "https://leaderboardadc-copy3.onrender.com",
};

function Leaderboard({ c }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("Never");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = challengesList[c]; // Dynamically assign backend URL based on challenge number

  useEffect(() => {
    if (!backendUrl) {
      setError("No backend URL provided");
      setLoading(false);
      return;
    }

    async function fetchLeaderboard() {
      try {
        const response = await fetch(`${backendUrl}/api/leaderboard`);
        const data = await response.json();
        setLeaderboard(data.leaderboard);
        setLastUpdated(data.last_updated);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(`Failed to fetch leaderboard data from url ${backendUrl}/api/leaderboard`);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();

    // Connect to Socket.IO for real-time updates
    const socket = io(backendUrl);

    socket.on("update_leaderboard", (data) => {
      console.log("Received real-time update:", data);
      setLeaderboard(data.leaderboard);
      setLastUpdated(new Date().toLocaleString()); // Update last updated time
    });

    return () => {
      socket.disconnect(); // Cleanup socket connection when component unmounts
    };
  }, [backendUrl]); // Dependency array will re-run this effect when `backendUrl` changes

  return (
    <div className="w-full min-h-screen bg-custom-background bg-cover bg-center bg-fixed p-0 m-0 bg-no-repeat">
      <NavBar />
      <div>
        <h1>Challenge {c} Leaderboard</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className="update">
          Last Updated: <span className="last-updated">{lastUpdated}</span>
        </p>
        {loading ? (
          <div className="flex flex-col space-y-5 justify-center items-center h-64">
            <p className="text-lg text-white">Please wait for a moment 😉</p>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500 border-solid"></div>
          </div>
        ) : (
          <div className="container mx-auto w-[85%] my-12 bg-white p-5 rounded-xl shadow-lg overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Team</th>
                  <th>Submission Date</th>
                  <th className="score">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={index}>
                    <td>{entry.rank}</td>
                    <td>{entry.team}</td>
                    <td>{entry.submission_date}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
