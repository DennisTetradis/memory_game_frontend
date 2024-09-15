import { useState, useEffect } from "react";
import axios from "axios";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { PacmanLoader } from "react-spinners";

interface ScoreboardProps {
  username: string;
  onButtonClick: (buttonName: string) => void;
}

export default function Scoreboard({
  username,
  onButtonClick,
}: ScoreboardProps) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Medium");
  const [scoreBoard, setScoreBoard] = useState([
    { _id: "1234", difficulty: "loading..", username: "loading..", score: 0 },
  ]);
  const [myRank, setMyRand] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    get_scoreboard(selectedDifficulty);
  }, [selectedDifficulty]);

  const get_scoreboard = async (difficulty: string) => {
    try {
      const response = await axios.get(`${apiUrl}/get_scoreboard`, {
        params: {
          difficulty: difficulty,
        },
      });

      const data = response.data;
      const sortedScores = data.sort((a: any, b: any) => b.score - a.score);
      const Rank =
        sortedScores.findIndex((score: any) => score.username === username) + 1;
      setScoreBoard(sortedScores);
      setMyRand(Rank);
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const difficulties = ["Easy", "Medium", "Hard", "Insane"];

  const handleClick = (button_difficulty: string) => {
    setSelectedDifficulty(button_difficulty);
  };

  return (
    <div className="relative">
      <button
        className="absolute text-customWhite top-1/4 md:top-1/2 left-2/4 md:left-1/4 z-50 md:-translate-x-10 -translate-x-10 md:-translate-y-40 -translate-y-60 text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => onButtonClick("Scoreboard")}
      >
        <TbPlayerTrackNextFilled />
      </button>
      <div className="bg-customWhite max-w-2xl md:w-2/6 w-5/6 md:max-w-full mx-auto border border-customWhite rounded-lg shadow-lg md:mt-60 mt-40">
        <div className="grid bg-customDarkPurple grid-cols-2 md:grid-cols-4 gap-1 rounded-lg rounded-b-none p-1 md:pb-0">
          {difficulties.map((button_difficulty) => (
            <button
              key={button_difficulty}
              className={`text-customWhite font-jersey text-4xl py-2 rounded md:rounded-b-none transition-all duration-300 shadow-lg ${
                selectedDifficulty === button_difficulty
                  ? "bg-customDarkPurple"
                  : "bg-customPurple"
              }`}
              onClick={() => {
                setSelectedDifficulty(button_difficulty);
                handleClick(button_difficulty);
              }}
            >
              {button_difficulty}
            </button>
          ))}
        </div>
        <div className="overflow-y-auto h-96 md:h-72 px-4 py-2">
          <div className="flex flex-col items-center justify-center space-y-4">
            {myRank > 0 && (
              <div className="w-full md:w-4/5 text-center bg-customPurple rounded shadow-lg">
                <span className="font-bold text-xl md:text-lg mr-4">
                  #{myRank}
                </span>
                <span className="font-bold text-xl md:text-lg">{username}</span>
              </div>
            )}
            {isLoading ? (
              <div className="w-1/2 my-10">
                <PacmanLoader
                  color={"#9681ea"}
                  loading={isLoading}
                  size={80}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <div className="w-full md:w-4/5">
                {scoreBoard.map((score, index) => (
                  <div
                    key={score._id}
                    className={`w-full p-2 text-center rounded md:text-sm ${
                      score.username === username
                        ? "text-customPurple"
                        : "text-customDarkPurple"
                    }`}
                  >
                    <span className="font-bold text-xl md:text-lg mr-4">
                      #{index + 1}
                    </span>
                    <span className="font-bold text-xl md:text-lg">
                      {score.username}
                    </span>
                    <span className="ml-4 text-lg md:text-sm text-customDarkPurple">
                      {score.score}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
