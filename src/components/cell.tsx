import clsx from "clsx";
import ICell from "./singleplayer/types/cell";

interface GameProps {
  cell: ICell;
  isVisible: boolean;
  rowIndex: number;
  colIndex: number;
  onElementClick: (correct: boolean) => void;
}

export default function Cell({
  cell,
  isVisible,
  rowIndex,
  colIndex,
  onElementClick,
}: GameProps) {
  const handleCellClick = (cell: ICell) => {
    if (cell.element && !cell.open) {
      cell.open = !cell.open;
      onElementClick(true);
    } else if (!cell.element) {
      onElementClick(false);
    }
  };

  return (
    <div>
      {isVisible && cell.element ? (
        <button
          key={`${rowIndex}-${colIndex}`}
          className={clsx(
            "p-10 rounded-lg shadow-lg focus:outline-none transition-all duration-500 bg-customPurple animate-flip"
          )}
        ></button>
      ) : (
        <button
          key={`${rowIndex}-${colIndex}`}
          className={clsx(
            "p-10 text-white rounded-lg shadow-lg transition-all duration-500",
            {
              "bg-customWhite hover:ring-4 ring-customPurple": !cell.open,
              "bg-customPurple": cell.open,
              "animate-flip": cell.open,
              "animate-unflip": !cell.open,
            }
          )}
          onClick={() => {
            handleCellClick(cell);
          }}
        ></button>
      )}
    </div>
  );
}
