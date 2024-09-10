import React, { useState } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

interface DifficultyProps {
  onButtonClick: (buttonName: string) => void;
}

export default function Difficulty({ onButtonClick }: DifficultyProps) {
  const [username, setUsername] = useState("insert username...");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleForumSubmit = () => {
    if (username !== "") {
      onButtonClick(username);
    }
  };

  return (
    <div>
      <form className="flex flex-row items-center justify-center h-screen">
        <input
          className="bg-customDarkPurple placeholder-customPurple font-jersey text-center text-customPurple text-5xl border-2 border-customPurple rounded-lg shadow-lg hover:bg-customDarkPurple transition-all duration-300 ease-in-out transform hover:scale-105"
          placeholder="insert username..."
          onChange={(e) => {
            handleChange(e);
          }}
        ></input>
        <button
          className="text-customWhite text-2xl rounded-full mx-2 p-2 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
          onClick={() => handleForumSubmit()}
        >
          <TbPlayerTrackNextFilled />
        </button>
      </form>
    </div>
  );
}
