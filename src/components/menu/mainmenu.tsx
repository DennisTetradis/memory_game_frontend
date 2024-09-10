interface MainmenuProps {
  onButtonClick: (buttonName: string) => void;
}

export default function Mainmenu({ onButtonClick }: MainmenuProps) {
  const items = ["Play", "Play with a friend", "Scoreboard", "Exit"];

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {items.map((buttonName) => (
        <button
          className=" text-customWhite font-jersey text-5xl px-4 py-2 m-3 w-96 rounded hover:bg-customPurple"
          key={buttonName}
          onClick={() => onButtonClick(buttonName)}
        >
          {buttonName}
        </button>
      ))}
    </div>
  );
}
