import { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function AnimatedText() {
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate(); // Initialize navigate function

  useEffect(() => {
    // Show the second text and buttons after "Welcome, Operator!" is fully typed
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2500); // Adjust timing based on the typing duration

    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="absolute flex flex-col items-center justify-center text-white gap-15 top-60 right-[20%] w-[60%] p-1">
      {/* Content container with red border, limited to content size */}
      <div className="p-4 rounded-lg">
        {/* Typing Effect for "Welcome, Operator!" */}
        <h1 className="text-4xl font-bold m-20" style={{ minHeight: "60px" }}>
          <Typewriter
            words={["Welcome Operator!"]}
            loop={false}
            typeSpeed={100}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>

        {/* Content that appears after typing with a fade-in effect */}
        <div
          className={`transition-opacity duration-1000 ${
            showContent ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Second Text */}
          <h2 className="mt-4 text-2xl font-light mb-15">
            Are you ready to break free and rewrite the system?
          </h2>

          {/* Buttons */}
          <div className="flex mt-16 space-x-4 flex-row justify-center items-center gap-10">
            {/* Yes Button */}
            <button
              className="bg-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-red-700 transition hover:-translate-y-1 flying-button"
              onClick={() => navigate("/challenges")} // Navigate to Challenges page
            >
              Yes
            </button>
            {/* No Button (changes to Yes on hover) */}
            <button
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition hover:bg-red-600 hover:-translate-y-1 flying-button"
              onMouseEnter={(e) => {
                e.target.innerText = "Yes";
              }}
              onMouseLeave={(e) => {
                e.target.innerText = "No";
              }}
              onClick={() => navigate("/challenges")} // Navigate to Challenges page
            >
              No
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fly {
          0%,
          100% {
            transform: translateY(0); /* Original position */
          }
          50% {
            transform: translateY(-10px); /* Move up slightly */
          }
        }

        .flying-button {
          animation: fly 2s infinite; /* Apply animation with infinite loop */
        }
      `}</style>
    </div>
  );
}

export default AnimatedText;
