import React from "react";
import ChallengeCard from "../../ChallengeCard"; // Import the ChallengeCard component
import NavBar from "../../Navbar";
function Challenges() {
  // Array of challenge data
  const challenges = [
    {
      title: "ADC4.0 -intern- 01",
      description:
        " In this challenge, your task is to predict whether the away team wins a football match based on pre-match statistics for both teams. Good luck and enjoy the game!",
      weight: "5kg",
      challengeLink: "https://www.kaggle.com/t/f50c00eaf34148ad9a1db9c093683273",
      challengeNum:"1",
    },
    {
      title: "ADC4.0 -intern- 02",
      description:
        "In this challenge, your task is to predict the groundwater level category (Very Low, Low, Average, or Very High) for a given piezometric station based on various features like location, water quality, population, and more. Good luck and enjoy the learning process!",
      weight: "5kg",
      challengeLink: "https://www.kaggle.com/t/c3290c6d0a844179a8d665e07562677d",  
      challengeNum:"2",
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
            challengeNum={challenge.challengeNum}
          />
        ))}
      </div>
    </div>
  );
}

export default Challenges;
