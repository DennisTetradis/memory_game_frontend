import { useState, useRef } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

interface DifficultyProps {
  onButtonClick: (buttonName: string) => void;
}

export default function Difficulty({ onButtonClick }: DifficultyProps) {
  const [spanValue, setSpanValue] = useState("Helloasdlk jaklfj klasfjlk");
  const spanDescription = useRef<HTMLSpanElement | null>(null);
  const items = [
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

  return (
    <div>
      <button
        className="absolute text-customWhite top-1/2 left-1/4 -translate-y-8 -translate-x-10 text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          onButtonClick("Difficulty");
        }}
      >
        <TbPlayerTrackNextFilled />
      </button>
      <div className="flex flex-row items-center justify-center h-screen">
        {items.map((button) => (
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
              onClick={() => onButtonClick(button.difficulty)}
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
  );
}
