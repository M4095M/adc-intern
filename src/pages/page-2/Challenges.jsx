import React from "react";
import ChallengeCard from "../../ChallengeCard"; // Import the ChallengeCard component
import NavBar from "../../Navbar";
function Challenges() {
  // Array of challenge data
  const challenges = [
    {
      title: "Challenge 1",
      description:
        "Think fast, code faster! This challenge pushes your problem-solving and coding skills to their limits. With a timer ticking down, you'll need to solve as many coding puzzles as possible before the clock hits zero.",
      weight: "5kg",
      challengeLink: "https://www.kaggle.com/",
    },
    {
      title: "Challenge 2",
      description:
        "Think fast, code faster! This challenge pushes your problem-solving and coding skills to their limits. With a timer ticking down, you'll need to solve as many coding puzzles as possible before the clock hits zero.",
      weight: "3kg",
      challengeLink: "https://www.kaggle.com/",
    },
    {
      title: "Challenge 3",
      description:
        "Think fast, code faster! This challenge pushes your problem-solving and coding skills to their limits. With a timer ticking down, you'll need to solve as many coding puzzles as possible before the clock hits zero.",
      weight: "8kg",
      challengeLink: "https://www.kaggle.com/",
    },
    {
      title: "Challenge 4",
      description:
        "Think fast, code faster! This challenge pushes your problem-solving and coding skills to their limits. With a timer ticking down, you'll need to solve as many coding puzzles as possible before the clock hits zero.",
      weight: "6kg",
      challengeLink: "https://www.kaggle.com/",
    },
    {
      title: "Challenge 5",
      description:
        "Think fast, code faster! This challenge pushes your problem-solving and coding skills to their limits. With a timer ticking down, you'll need to solve as many coding puzzles as possible before the clock hits zero.",
      weight: "4kg",
      challengeLink: "https://www.kaggle.com/",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-custom-background bg-cover bg-center bg-fixed p-0 m-0 bg-no-repeat">
      <NavBar></NavBar>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 m-5">
        {challenges.map((challenge, index) => (
          <ChallengeCard
            key={index}
            title={challenge.title}
            description={challenge.description}
            weight={challenge.weight}
            challengeLink={challenge.challengeLink}
          />
        ))}
      </div>
    </div>
  );
}

export default Challenges;
