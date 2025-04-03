import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./Leaderboard.css"; // Make sure styles are correct in this file
import NavBar from "../../Navbar";

// Challenges list with backend URLs
const challengesList = {
  "0": "https://leaderboardadc-copy3.onrender.com/",
  "1": "https://leaderboardadc-copy3.onrender.com/",
  "2": "https://leaderboardadc-copy3.onrender.com/",
};

// Mapping for competition IDs to competition names
const competitionNames = {
  "1": "byu-cs-270-midterm-2-classification-competition",
  "2": "bert-classification-ioai",
};

function Leaderboard({ c }) {
  const [leaderboard, setLeaderboard] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("Never");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = challengesList[c];

  const competitionName = competitionNames[c]; // Get the competition name from the dictionary // Get backend URL based on competition ID

  useEffect(() => {
    if (!backendUrl) {
      setError("No backend URL provided");
      setLoading(false);
      return;
    }

    async function fetchLeaderboard() {
      if (c === "0") {
        try {
          const responses = await Promise.all(
            Object.entries(challengesList)
              .filter(([key]) => key !== "0") // Exclude challenge "0" itself
              .map(([key, url]) =>
                fetch(`${url}/api/leaderboard/${competitionNames[key]}`).then(res => res.json())
              )
          );

          const allEntries = responses.flatMap(data => data.leaderboard);

          if (allEntries.length === 0) {
            setLeaderboard([]);
            setError("No data available for averaging.");
            return;
          }

          // Group scores by team name
          const teamScores = {};
          allEntries.forEach(({ team, score, submission_date }) => {
            if (!teamScores[team]) {
              teamScores[team] = { totalScore: 0, count: 0, latestSubmission: "1970-01-01" };
            }
            teamScores[team].totalScore += score;
            console.log(`Team: ${team}, Total Score: ${teamScores[team].totalScore}, Count: ${teamScores[team].count}, Average: ${(teamScores[team].totalScore / teamScores[team].count)}`);
            teamScores[team].count += 1;
            if (new Date(submission_date) > new Date(teamScores[team].latestSubmission)) {
              teamScores[team].latestSubmission = submission_date;
            }
          });

          // Calculate averages
          const averagedLeaderboard = Object.entries(teamScores).map(([team, { totalScore, count, latestSubmission }]) => ({
            rank: "-",
            team,
            submission_date: latestSubmission,
            score: (parseFloat(totalScore) / (Object.keys(challengesList).length - 1)).toFixed(4),
          }));

          // Sort by score descending
          averagedLeaderboard.sort((a, b) => b.score - a.score);

          // Assign ranks dynamically
          let rank = 1;
          for (let i = 0; i < averagedLeaderboard.length; i++) {
            if (i > 0 && averagedLeaderboard[i].score !== averagedLeaderboard[i - 1].score) {
              rank = i + 1;
            }
            averagedLeaderboard[i].rank = rank;
          }

          setLeaderboard(averagedLeaderboard);
          setLastUpdated(new Date().toLocaleString());
        } catch (err) {
          console.error("Error calculating average leaderboard:", err);
          setError("Failed to calculate average leaderboard.");
        } finally {
          setLoading(false);
        }
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/api/leaderboard/${competitionName}`); // Include competition ID in the route
        const data = await response.json();
        setLeaderboard(data.leaderboard);
        setLastUpdated(data.last_updated);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setError(`Failed to fetch leaderboard data from url ${backendUrl}/api/leaderboard/${competitionName}`);
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
  }, [backendUrl, c]); // Dependency array includes `c` to re-run the effect when `c` changes


  return (
    <div className="w-full min-h-screen bg-custom-background bg-cover bg-center bg-fixed p-0 m-0 bg-no-repeat">
      <NavBar />
      <div>
        <h1>{competitionName} Leaderboard</h1> {/* Display the competition name */}
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
