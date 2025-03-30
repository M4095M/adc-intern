import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Leaderboard.css"; // Add the provided CSS styles in this file

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("Never");
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch initial data
    async function fetchLeaderboard() {
      try {
        const response = await fetch("https://leaderboardadc-copy3.onrender.com/api/leaderboard");
        const data = await response.json();
        setLeaderboard(data.leaderboard);
        setLastUpdated(data.last_updated);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to fetch leaderboard data");
      }
    }

    fetchLeaderboard();

    // Connect to Socket.IO for real-time updates
    const socket = io("https://leaderboardadc-copy3.onrender.com");

    socket.on("update_leaderboard", (data) => {
      console.log("Received real-time update:", data);
      setLeaderboard(data.leaderboard);
      setLastUpdated(new Date().toLocaleString());
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Challenge 1 Leaderboard</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className="update">
        Last Updated: <span className="last-updated">{lastUpdated}</span>
      </p>
      <div className="container">
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
    </div>
  );
}

export default Leaderboard;
