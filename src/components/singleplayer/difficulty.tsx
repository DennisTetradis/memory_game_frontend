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
    <div className="relative ">
      <button
        className="absolute text-customWhite top-1/2 left-20 md:top-1/2 md:left-1/4 -translate-y-8 -translate-x-10 text-3xl md:text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          onButtonClick("Difficulty");
        }}
      >
        <TbPlayerTrackNextFilled />
      </button>
      <div className="flex flex-col items-center justify-center h-screen p-4 md:flex-row md:flex-wrap">
        {items.map((button) => (
          <div className="relative mb-4 md:mb-0" key={button.description}>
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
              className="font-jersey text-3xl md:text-5xl hover:bg-customPurple text-customWhite px-4 py-2 rounded md:w-48 md:mx-2"
              key={button.difficulty}
              onClick={() => onButtonClick(button.difficulty)}
            >
              {button.difficulty}
            </button>
          </div>
        ))}
        <span
          ref={spanDescription}
          className="absolute bottom-16 md:bottom-72 select-none text-2xl md:text-3xl font-serif mb-2 w-max text-customPurple rounded-lg py-5 px-2 z-10 justify-center opacity-0 hover:opacity-100 transition-opacity duration-700"
        >
          {spanValue}
        </span>
      </div>
    </div>
  );
}
