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
        <div className="relative">
          <button
            className="absolute text-customWhite top-1/2 left-20 md:top-1/2 md:left-1/4 -translate-y-8 -translate-x-10 text-3xl md:text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              onButtonClick("Play with a friend");
            }}
          >
            <TbPlayerTrackNextFilled />
          </button>
          <div className="flex flex-col items-center justify-center h-screen p-4 md:flex-row md:space-x-4">
            {choices.map((button) => (
              <div className="relative mb-4 md:mb-0" key={button}>
                <button
                  className="font-jersey text-3xl md:text-5xl hover:bg-customPurple text-customWhite px-4 py-2 rounded w-full md:w-64"
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
        <div className="relative">
          <button
            className="absolute text-customWhite top-1/2 left-20 md:top-1/2 md:left-1/4 -translate-y-8 -translate-x-10 text-3xl md:text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              toggleDifficulty();
            }}
          >
            <TbPlayerTrackNextFilled />
          </button>
          <div className="flex flex-col items-center justify-center h-screen space-y-4 md:space-y-0 md:flex-row md:space-x-0 p-4">
            {difficulties.map((button) => (
              <div className="relative" key={button.description}>
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
                  className="font-jersey text-3xl md:text-5xl hover:bg-customPurple text-customWhite px-4 py-2 m-3 md:m-5 rounded w-40 md:w-48"
                  onClick={() => onDifficultySelect(button.difficulty)}
                >
                  {button.difficulty}
                </button>
              </div>
            ))}
            <span
              ref={spanDescription}
              className="absolute bottom-24 md:bottom-72 select-none text-xl md:text-3xl font-serif w-max text-customPurple rounded-lg py-3 px-2 z-10 justify-center opacity-0 transition-opacity duration-700"
            >
              {spanValue}
            </span>
          </div>
        </div>
      )}
      {isJoinRoomOpen && (
        <div className="relative">
          <button
            className="absolute text-customWhite top-1/4 left-4 md:top-1/2 md:left-1/4 -translate-y-0 md:-translate-y-8 -translate-x-0 md:-translate-x-10 text-3xl md:text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              toggleJoinRoom();
            }}
          >
            <TbPlayerTrackNextFilled />
          </button>
          <div className="flex flex-col items-center justify-center h-screen space-y-4 md:space-y-0 md:flex-row md:space-x-4 p-4">
            <form
              onSubmit={() => handleJoinRoomBack()}
              className="w-full md:w-auto"
            >
              <input
                className="w-full md:w-auto bg-customPurple font-jersey text-center text-customWhite text-2xl md:text-5xl border border-customWhite rounded-lg shadow-lg hover:bg-customDarkPurple transition-all duration-300 ease-in-out transform hover:scale-105 p-3"
                placeholder="Insert room code..."
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setRoomId(e.target.value);
                }}
              />
            </form>
            <button
              className="text-customWhite text-2xl md:text-3xl rounded-full mx-2 p-3 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
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
