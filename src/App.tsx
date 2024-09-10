import React, { useState } from "react";
import axios from "axios";
import "./App.css";

import MainMenu from "./components/menu/mainmenu";
import Difficulty from "./components/singleplayer/difficulty";
import Game from "./components/singleplayer/game";
import Username from "./components/menu/username";
import Scoreboard from "./components/menu/scoreboard";
import Multiplayer from "./components/multiplayer/menu";

const App: React.FC = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [isOpenMainmenu, setIsOpenMainmenu] = useState<boolean>(false);
  const [isOpenScoreBoard, setIsOpenScoreBoard] = useState<boolean>(false);
  const [isOpenGame, setIsOpenGame] = useState<boolean>(false);
  const [isOpenUsername, setIsOpenUsername] = useState<boolean>(true);
  const [isOpenDifficulty, setIsOpenDifficulty] = useState<boolean>(false);
  const [isOpenMultiplayer, setIsOpenMultiplayer] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("...");
  const [difficulty, setDifficulty] = useState<string>("");

  const handleUsername = (username: string) => {
    setUsername(username);
    handleToggle("Username");
  };

  const save_score = async (
    username: string,
    score: number,
    difficulty: string
  ) => {
    try {
      const response = await axios.post(`${apiUrl}/save_score`, {
        username: username,
        score: score,
        difficulty: difficulty,
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGameEnd = (score: number, difficulty: string) => {
    setIsOpenGame(false);
    setIsOpenMultiplayer(false);
    setIsOpenMainmenu(true);
    save_score(username, score, difficulty);
    console.log("Game End: ", score, difficulty);
  };

  const handleToggle = (choise: string) => {
    switch (choise) {
      case "Username": {
        setIsOpenUsername(!isOpenUsername);
        setIsOpenMainmenu(!isOpenMainmenu);
        break;
      }
      case "Exit": {
        setUsername("...");
        setIsOpenUsername(!isOpenUsername);
        setIsOpenMainmenu(!isOpenMainmenu);
        break;
      }
      case "Play": {
        setIsOpenMainmenu(!isOpenMainmenu);
        setIsOpenDifficulty(!isOpenDifficulty);
        break;
      }
      case "Scoreboard": {
        setIsOpenMainmenu(!isOpenMainmenu);
        setIsOpenScoreBoard(!isOpenScoreBoard);
        break;
      }
      case "Difficulty": {
        setIsOpenMainmenu(!isOpenMainmenu);
        setIsOpenDifficulty(!isOpenDifficulty);

        break;
      }
      case "Play with a friend": {
        setIsOpenMultiplayer(!isOpenMultiplayer);
        setIsOpenMainmenu(!isOpenMainmenu);
        break;
      }
      case "Game": {
        setIsOpenGame(!isOpenGame);
        break;
      }
      case "Easy":
      case "Medium":
      case "Hard":
      case "Insane": {
        setDifficulty(choise);
        setIsOpenDifficulty(!isOpenDifficulty);
        setIsOpenGame(!isOpenGame);
        break;
      }
    }
  };

  return (
    <>
      <div className="h-screen bg-customDarkPurple">
        <h1 className="absolute select-none font-jersey text-9xl z-40 top-8 p-4 left-1/2 transform -translate-x-1/2 mb-4 bg-gradient-to-r from-customPurple via-customWhite to-customPurple text-transparent bg-clip-text text-shadow-glow hover:text-shadow-glow-hover">
          MemoryGame
        </h1>

        <div className="absolute top-12 right-4 flex space-x-4 m-4">
          <p className="font-jersey text-6xl rounded-lg text-customWhite text-center p-2 py-1 border-4 border-customPurple min-w-40">
            {username}
          </p>
        </div>
        {isOpenUsername && <Username onButtonClick={handleUsername} />}
        {isOpenMainmenu && <MainMenu onButtonClick={handleToggle} />}
        {isOpenScoreBoard && (
          <Scoreboard username={username} onButtonClick={handleToggle} />
        )}
        {isOpenDifficulty && <Difficulty onButtonClick={handleToggle} />}
        {isOpenGame && (
          <Game onGameEnd={handleGameEnd} maps_difficulty={difficulty} />
        )}

        {isOpenMultiplayer && (
          <Multiplayer
            onButtonClick={handleToggle}
            onGameEnd={handleGameEnd}
            username={username}
          />
        )}
      </div>
    </>
  );
};

export default App;
