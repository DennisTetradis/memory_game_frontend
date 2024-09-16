import { useState } from "react";
import getDifficulty from "./helpers/difficulty";
import Generate_Matrix from "./helpers/matrix_generator";
import Cell from "../cell";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

interface MainmenuProps {
  onGameEnd: (score: number, difficulty: string) => void;
  maps_difficulty: string;
}

export default function Mainmenu({
  onGameEnd,
  maps_difficulty,
}: MainmenuProps) {
  const [starting_elements, starting_size] = getDifficulty(maps_difficulty);
  const [elementsVisible, setElementsVisible] = useState(false);
  const [map, setMap] = useState(
    Generate_Matrix(starting_elements, starting_size)
  );

  const [elements, setElements] = useState<number>(starting_elements);
  const [size, setSize] = useState<number>(starting_size);
  const [foundElements, setFountElements] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [lives, setLives] = useState<number>(5);
  const [livesUsed, setLivesUsed] = useState<number>(0);
  const [isGameOver, setIsIsGameOver] = useState<boolean>(false);
  const [isWaitingToStart, setIsWaitingToStart] = useState<boolean>(true);

  const handleCellClick = (correct: boolean) => {
    let temp = foundElements + 1;
    if (correct) {
      setFountElements(temp);
      if (temp === elements) {
        console.log("You won");
        setTimeout(() => {
          handleWin();
        }, 1000);
      }
    } else if (lives >= 1) {
      setLives(lives - 1);
      setLivesUsed(livesUsed + 1);
      setElementsVisible(true);
      setIsWaitingToStart(true);
    } else {
      setIsIsGameOver(true);
    }
  };

  const handleReady = () => {
    setIsWaitingToStart(false);
    setElementsVisible(true);
    setTimeout(() => {
      setElementsVisible(false);
    }, 3000);
  };

  const handleLoss = () => {
    onGameEnd(score, maps_difficulty);
  };

  const handleWin = () => {
    setMap(Generate_Matrix(elements + 1, Math.floor(size + 1)));
    setSize(size + 0.5);
    setFountElements(0);
    setLives(lives + 0.5);
    setScore(score + elements);
    setElements(elements + 1);
    setIsWaitingToStart(true);
  };

  return (
    <div>
      <button
        className="absolute text-customWhite top-1/4 md:top-1/2 left-2/4 md:left-1/4 z-50 md:-translate-x-10 -translate-x-10 md:-translate-y-8 -translate-y-40 text-5xl md:text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          handleLoss();
        }}
      >
        <TbPlayerTrackNextFilled />
      </button>
      {isWaitingToStart && (
        <div className="absolute left-1/2 top-2/4 bg-customWhite border-8 z-20 border-customPurple rounded-lg transform -translate-x-1/2 -translate-y-16 mb-4 flex items-center p-6">
          <button className="object-cover" onClick={() => handleReady()}>
            <div className="flex flex-col">
              <h1 className="text-center font-jersey text-6xl bg-gradient-to-r from-customPurple via-customWhite to-customPurple text-transparent bg-clip-text">
                Click here to start
              </h1>
            </div>
          </button>
        </div>
      )}
      {isGameOver && (
        <div className="absolute left-1/2 top-1/4 bg-customWhite border-8 z-20 border-customPurple rounded-lg transform -translate-x-1/2 mb-4 flex items-center p-6">
          <button className="object-cover" onClick={() => handleLoss()}>
            <div className="flex flex-col">
              <h1 className="text-center font-jersey text-9xl bg-gradient-to-r from-customPurple via-customWhite to-customPurple text-transparent bg-clip-text">
                GAME OVER
              </h1>
              <div className="flex flex-row items-center justify-center p-12 pb-1">
                <h1 className="text-customPurple font-jersey text-5xl">
                  Score:
                </h1>
                <h1 className="p-2 text-customPurple font-jersey text-5xl">
                  {score}
                </h1>
              </div>
              <div className="flex flex-row items-center justify-center p-12 pt-0">
                <h1 className="text-customPurple font-jersey text-5xl">
                  Lives used:
                </h1>
                <h1 className="p-2 text-customPurple font-jersey text-5xl">
                  {livesUsed}
                </h1>
              </div>
            </div>
          </button>
        </div>
      )}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 flex items-center p-6">
        <h1 className="text-customWhite font-jersey text-5xl">Lives:</h1>
        <h1 className="p-2 text-customPurple font-jersey text-5xl">
          {Math.floor(lives)}
        </h1>
        <h1 className="text-customWhite font-jersey text-5xl">Score:</h1>
        <h1 className="p-2 text-customPurple font-jersey text-5xl">{score}</h1>
      </div>

      <div className="flex items-center justify-center h-screen bg-customDarkPurple outline-none ring-2 ring-customWhite ring-offset-2">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${Math.floor(
              size + 0.5
            )}, minmax(0, 1fr))`,
          }}
        >
          {map.cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                isVisible={elementsVisible}
                rowIndex={rowIndex}
                colIndex={colIndex}
                onElementClick={handleCellClick}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
