import React, { useState, useRef } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import Game from "./game";

interface MultiplayerMenuProps {
  onButtonClick: (buttonName: string) => void;
  onGameEnd: (score: number, difficulty: string) => void;
  username: string;
}

export default function MultiplayerMenu({
  onButtonClick,
  onGameEnd,
  username,
}: MultiplayerMenuProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  const [isDifficultyOpen, setIsDifficultyOpen] = useState<boolean>(false);
  const [isJoinRoomOpen, setIsJoinRoomOpen] = useState<boolean>(false);
  const [spanValue, setSpanValue] = useState("");
  const spanDescription = useRef<HTMLSpanElement | null>(null);
  const [roomId, setRoomId] = useState<string>(
    Array.from({ length: 5 }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
        Math.floor(Math.random() * 62)
      )
    ).join("")
  );
  const [isGameOpen, setIsGameOpen] = useState<boolean>(false);

  const difficulties = [
    {
      difficulty: "Easy",
      description: "A warm-up for your brain cells—like a stroll in the park!",
    },
    {
      difficulty: "Medium",
      description:
        "Your brain might break a tiny sweat. No worries, you've got this!",
    },
    {
      difficulty: "Hard",
      description: "Memory boot camp! Time to flex those mental muscles!",
    },
    {
      difficulty: "Insane",
      description:
        "Good luck, you're basically entering the memory matrix. May the odds be ever in your favor!",
    },
  ];

  const choices = ["join room", "create room"];

  const onChoice = (choice: string) => {
    if (choice === "join room") {
      setIsMenuOpen(false);
      setIsJoinRoomOpen(true);
    } else if (choice === "create room") {
      setIsMenuOpen(false);
      setIsDifficultyOpen(true);
    }
  };

  const toggleJoinRoom = () => {
    setIsMenuOpen(true);
    setIsJoinRoomOpen(false);
    setIsDifficultyOpen(false);
  };

  const toggleDifficulty = () => {
    setIsDifficultyOpen(false);
    setIsMenuOpen(true);
  };

  const handleJoinRoomBack = () => {
    setIsJoinRoomOpen(false);
    setIsGameOpen(true);
  };

  const onDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setIsDifficultyOpen(false);
    setIsGameOpen(true);
  };

  const handleGameEnd = (score: number, difficulty: string) => {
    onGameEnd(score, difficulty);
  };

  return (
    <div>
      {isMenuOpen && (
        <div>
          <button
            className="absolute text-customWhite top-1/2 left-1/4 -translate-y-8 -translate-x-10 text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              onButtonClick("Play with a friend");
            }}
          >
            <TbPlayerTrackNextFilled />
          </button>
          <div className="flex flex-row items-center justify-center h-screen">
            {choices.map((button) => (
              <div className="relative " key={button}>
                <button
                  className="font-jersey text-5xl hover:bg-customPurple text-customWhite px-4 py-2 m-3 rounded w-64"
                  key={button}
                  onClick={() => onChoice(button)}
                >
                  {button}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {isDifficultyOpen && (
        <div>
          <button
            className="absolute text-customWhite top-1/2 left-1/4 -translate-y-8 -translate-x-10 text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              toggleDifficulty();
            }}
          >
            <TbPlayerTrackNextFilled />
          </button>
          <div className="flex flex-row items-center justify-center h-screen">
            {difficulties.map((button) => (
              <div className="relative " key={button.description}>
                <button
                  onMouseEnter={() => {
                    setSpanValue(button.description);
                    if (spanDescription.current) {
                      spanDescription.current.style.opacity = "1";
                      setTimeout(() => {
                        if (spanDescription.current) {
                          spanDescription.current.style.opacity = "0";
                        }
                      }, 5000);
                    }
                  }}
                  className="font-jersey text-5xl hover:bg-customPurple text-customWhite px-4 py-2 m-5 rounded w-48"
                  key={button.difficulty}
                  onClick={() => onDifficultySelect(button.difficulty)}
                >
                  {button.difficulty}
                </button>
              </div>
            ))}

            <span
              ref={spanDescription}
              className="absolute bottom-72 select-none text-3xl font-serif mb-2 w-max text-customPurple rounded-lg py-5 px-2 z-10 justify-center opacity-0 hover:opacity-100 transition-opacity duration-700"
            >
              {spanValue}
            </span>
          </div>
        </div>
      )}
      {isJoinRoomOpen && (
        <div>
          <button
            className="absolute text-customWhite top-1/2 left-1/4 -translate-y-8 -translate-x-10 text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              toggleJoinRoom();
            }}
          >
            <TbPlayerTrackNextFilled />
          </button>
          <div className="flex flex-row items-center justify-center h-screen">
            <form onSubmit={() => handleJoinRoomBack()}>
              <input
                className="bg-customPurple font-jersey text-center text-customWhite text-5xl border border-customWhite rounded-lg shadow-lg hover:bg-customDarkPurple transition-all duration-300 ease-in-out transform hover:scale-105"
                placeholder="insert room code..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRoomId(e.target.value);
                }}
              ></input>
            </form>
            <button
              className="text-customWhite text-2xl rounded-full mx-2 p-2 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
              onClick={() => handleJoinRoomBack()}
            >
              <TbPlayerTrackNextFilled />
            </button>
          </div>
        </div>
      )}
      {isGameOpen && (
        <Game
          data={{
            roomId: roomId,
            difficulty: selectedDifficulty,
            username: username,
          }}
          onGameEnd={handleGameEnd}
        />
      )}
    </div>
  );
}
