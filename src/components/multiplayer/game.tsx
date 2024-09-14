import { useState, useEffect } from "react";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import getDifficulty from "../singleplayer/helpers/difficulty";
import Generate_Matrix from "../singleplayer/helpers/matrix_generator";
import Cell from "../cell";

interface GameProps {
  onGameEnd: (score: number, difficulty: string) => void;
  data: { roomId: string; difficulty: string; username: string };
}

export default function Game({ onGameEnd, data }: GameProps) {
  const apiWS = import.meta.env.VITE_API_WS;
  const [starting_elements, starting_size] = getDifficulty(
    data.difficulty === "" ? "Medium" : data.difficulty
  );
  const [elements, setElements] = useState(starting_elements);
  const [size, setSize] = useState(starting_size);
  const [elementsVisible, setElementsVisible] = useState(false);
  const [map, setMap] = useState(
    Generate_Matrix(starting_elements, starting_size)
  );
  const [socket] = useState(new WebSocket(`${apiWS}`));
  const [foundElements, setFountElements] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState<number>(4);
  const [livesUsed, setLivesUsed] = useState<number>(0);
  const [isGameOver, setIsIsGameOver] = useState<boolean>(false);
  const [isWaitingToStart, setIsWaitingToStart] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<string>(data.difficulty);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [isAdmin] = useState<boolean>(data.difficulty === "" ? false : true);
  const [playersScores, setPlayersScores] = useState([
    { username: data.username, score: 0 },
  ]);

  //Starting useEffect
  useEffect(() => {
    const timer = setTimeout(() => {
      joinRoom();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  ///socket commands ///socket commands///socket commands///socket commands

  const handleSocketRequest = (s_type: string, s_message: any) => {
    socket.send(
      JSON.stringify({
        type: s_type,
        message: s_message,
        room: data.roomId,
        username: data.username,
      })
    );
  };

  const joinRoom = () => {
    if (data.roomId !== "") {
      handleSocketRequest("join", "hi");
    }
    console.log("Joined room:", data.roomId);
  };

  socket.onmessage = ({ data }) => {
    const json = JSON.parse(data);
    switch (json.type) {
      case "difficulty_set":
        setDifficulty(json.difficulty);
        break;
      case "room_alert":
        alert(json.message);
        break;
      case "done":
        if (isAdmin) {
          handleSocketRequest("difficulty_set", difficulty);
        }
        if (isAdmin) {
          handleSocketRequest("get_next_map", {
            elements: elements + 1,
            size: Math.floor(size + 1),
            difficulty: difficulty,
          });
        }
        break;

      case "player_joined":
        if (json && isAdmin) {
          let tempList = [...playersScores];
          let player = tempList.find((p) => p.username === json.username);
          if (!player) {
            tempList.push({ username: json.username, score: 0 });
            handleSocketRequest("update_scores", tempList);
          }
          setPlayersScores(tempList);
        }
        break;

      case "update_scores":
        if (json.score) {
          let tempList = [...playersScores];
          let player = tempList.find((p) => p.username === json.username);

          if (player) {
            player.score = json.score;
          } else {
            tempList.push({ username: json.username, score: json.score });
          }
          setPlayersScores(tempList);
        } else if (json.score_array) {
          setPlayersScores(json.score_array);
        }
        if (isGameOver) {
          handleSocketRequest("ready", true);
        }
        break;

      case "remove_player":
        if (json.username) {
          let tempList = [...playersScores];
          tempList = tempList.filter(
            (client) => client.username !== json.username
          );
          setPlayersScores(tempList);
        }
        break;

      case "get_next_map":
        if (!isGameOver) {
          setIsWaitingToStart(false);
          handleWin(json.map);
        }
        break;
    }
  };

  ///socket commands ///socket commands///socket commands///socket commands

  //Flip elements////Flip elements//Flip elements////Flip elements
  useEffect(() => {
    const timer = setTimeout(() => {
      setElementsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [elementsVisible]);
  //Flip elements////Flip elements//Flip elements////Flip elements

  const handleCellClick = (correct: boolean) => {
    let temp = foundElements + 1;
    if (correct) {
      setFountElements(temp);
      if (temp === elements) {
        console.log("You won");
        setScore(score + elements);
        setIsWaitingToStart(true);
        handleSocketRequest("update_scores", score + elements);
      }
    } else if (lives >= 1) {
      setLives(lives - 1);
      setLivesUsed(livesUsed + 1);
      setElementsVisible(true);
    } else {
      setIsIsGameOver(true);
    }
  };

  const handleReady = () => {
    handleSocketRequest("ready", !isReady);
    setIsReady(!isReady);
  };

  const handleLoss = () => {
    handleSocketRequest("leave", "bb");
    onGameEnd(score, difficulty);
  };

  const handleWin = (map: any) => {
    setElements(map.elements);
    setSize(map.size);
    setMap(map);
    setElementsVisible(true);
    setIsReady(false);
    setFountElements(0);
    setLives(lives + 0.5);
  };

  return (
    <div>
      <button
        className="absolute text-customWhite top-1/2 left-1/4 -translate-y-8 -translate-x-40 text-5xl rounded-full mx-2 p-2 rotate-180 hover:bg-customPurple transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={() => {
          handleLoss();
        }}
      >
        <TbPlayerTrackNextFilled />
      </button>
      <div className="absolute right-1 top-1/4 min-w-20 bg-customWhite border-8 z-20 border-customPurple rounded-lg transform -translate-x-1/6 mb-4 mr-20">
        <h1
          className="font-jersey text-5xl text-center text-customPurple p-2 bg-customDarkPurple"
          key={Math.random()}
        >
          CONNECTED PLAYERS
        </h1>
        {playersScores.map((player) => (
          <div className="flex flex-row p-2 justify-center" key={Math.random()}>
            <h1
              className="font-jersey text-4xl pl-2 text-center text-customPurple"
              key={Math.random()}
            >
              {player.username} :
            </h1>
            <h1
              className="font-jersey text-4xl text-center px-1"
              key={Math.random()}
            >
              {player.score}
            </h1>
          </div>
        ))}
      </div>
      {isWaitingToStart && (
        <div className="absolute left-1/2 top-2/4 min-w-96 bg-customWhite border-8 z-20 border-customPurple rounded-lg transform -translate-x-1/2 -translate-y-1/2 mb-4 flex items-center p-6">
          <button className="object-cover" onClick={() => handleReady()}>
            <div className="flex flex-col">
              {isReady ? (
                <h1 className="text-center font-jersey text-6xl bg-gradient-to-r from-customPurple via-customWhite to-customPurple text-transparent bg-clip-text">
                  Waiting for other player...
                </h1>
              ) : (
                <h1 className="text-center font-jersey text-6xl px-7 bg-gradient-to-r from-customPurple via-customWhite to-customPurple text-transparent bg-clip-text">
                  Click here to get ready
                </h1>
              )}
              <div className="z-40 select-text flex flex-row items-center justify-center p-12 pb-1">
                <h1 className="z-40 text-customPurple select-text font-jersey text-3xl ">
                  Room code:
                </h1>
                <h1 className="z-40 p-2 text-customPurple font-jersey text-3xl">
                  {data.roomId}
                </h1>
              </div>
              {isReady ? <h1>Ready</h1> : <h1>Not ready</h1>}
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
              {isAdmin && (
                <div>
                  <h1 className="text-center font-jersey text-4xl bg-gradient-to-r from-customPurple via-customWhite to-customPurple text-transparent bg-clip-text">
                    PLSEASE WAIT FOR THE OTHERS
                  </h1>

                  <h1 className="text-center font-jersey text-4xl bg-gradient-to-r from-customPurple via-customWhite to-customPurple text-transparent bg-clip-text">
                    TO FINISH...
                  </h1>
                </div>
              )}
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
