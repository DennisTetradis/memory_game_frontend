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
    <div className="flex flex-col items-center justify-center h-screen px-4">
      <form className="flex flex-col sm:flex-row items-center w-full max-w-md">
        <input
          className="bg-customDarkPurple placeholder-customPurple font-jersey text-center text-customPurple text-xl sm:text-3xl lg:text-5xl border-2 border-customPurple rounded-lg shadow-lg py-2 px-4 w-full sm:w-auto hover:bg-customDarkPurple transition-all duration-300 ease-in-out transform hover:scale-105"
          placeholder="insert username..."
          onChange={(e) => handleChange(e)}
        />
        <button
          className="text-customWhite text-lg sm:text-2xl rounded-full mx-2 p-2 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105 mt-4 sm:mt-0"
          onClick={() => handleForumSubmit()}
        >
          <TbPlayerTrackNextFilled />
        </button>
      </form>
    </div>
  );
}
