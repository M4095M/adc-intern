import React from "react";
import { Link } from "react-router-dom";

function ChallengeCard({ title, description, weight, challengeLink,challengeNum }) {
  const handleButtonClick = () => {
    if (challengeLink) {
      window.location.href = challengeLink; // Redirect to the provided link
    } else {
      alert("No link provided for this challenge!");
    }
  };
  

  return (
    <div className="p-[1px] bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
      <div className="bg-black rounded-lg flex flex-col justify-between p-7 min-h-full">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-violet-400">
          {title || "Challenge number 1"}
        </h1>

        {/* Description */}
        <p className="text-gray-300 mb-4">
          {description ||
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae blanditiis aperiam quibusdam dicta sint quo maiores."}
        </p>

        {/* Footer */}
        <div className="flex flex-col justify-between items-center gap-6">
        <div className="flex flex-row justify-between gap-16 items-baseline">
          {/* Start Button */}
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-20"
            onClick={handleButtonClick}
          >
            Start
          </button>

          {/* Weight */}
          <p className="text-white">
            <span className="text-violet-400">Weight: </span>
            {weight || "N/A"}
          </p>
        </div>{/* Leaderboard Link 
        <button
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            
          >
            
          <Link
            to={`/Leaderboard-${challengeNum}`}
            className="hover:text-pink-500 transition-all"
            
          >
            Leaderboard
          </Link>
           
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ChallengeCard;
