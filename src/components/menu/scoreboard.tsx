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
    <div>
      <button
        className="absolute text-customWhite top-1/2 left-1/4 -translate-y-8 -translate-x-10 text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => onButtonClick("Scoreboard")}
      >
        <TbPlayerTrackNextFilled />
      </button>
      <div className="translate-x-1 translate-y-3/4 bg-customWhite max-w-2xl mx-auto border border-customWhite rounded-lg shadow-lg">
        <div className="object-center grid bg-customDarkPurple grid-cols-4 gap-2 mb-4 rounded-lg rounded-b-none p-2">
          {difficulties.map((button_difficulty) => (
            <button
              key={button_difficulty}
              className={`text-customWhite font-jersey text-4xl py-2 rounded transition-all duration-300 shadow-lg ${
                selectedDifficulty === button_difficulty
                  ? "bg-customDarkPurple"
                  : "bg-customPurple hover:bg-customDarkPurple"
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

        <div className="overflow-y-auto h-96 px-3 py-0">
          <div className="flex flex-col items-center justify-center space-y-4">
            {myRank > 0 && (
              <div className="w-4/5 p-4 text-center bg-customPurple rounded shadow-lg">
                <span className="font-bold text-xl mr-4">#{myRank}</span>
                <span className="font-bold text-xl">{username}</span>
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
              <div>
                {scoreBoard.map((score, index) => (
                  <div
                    key={score._id}
                    className={`w-3/4 p-2 text-center rounded ${
                      score.username === username
                        ? "text-customPurple"
                        : "text-customDarkPurple"
                    }`}
                  >
                    <span className="font-bold text-xl mr-4">#{index + 1}</span>
                    <span className="font-bold text-xl">{score.username}</span>
                    <span className="ml-4 text-lg text-customDarkPurple">
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
