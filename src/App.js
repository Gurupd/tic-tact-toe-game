import Board from "./Components/Board";
import React, { useState } from "react";
import "./styles/root.scss";
import { calculateWinner } from "./Components/Helper";
import History from "./Components/History";
import Status from "./Components/Status";

const NEWGAME = [{ board: Array(9).fill(null), isNext: true }];
function App() {
  const [history, sethistory] = useState(NEWGAME);
  const [currentMove, setCurrentmove] = useState(0); //keep track of current step
  const current = history[currentMove];

  console.log(history);
  const { winner, winningSquares } = calculateWinner(current.board);

  const handleSquareclick = (position) => {
    if (current.board[position] || winner) {
      return;
    }
    sethistory((prev) => {
      const last = prev[prev.length - 1];
      const newBoard = last.board.map((square, pos) => {
        if (pos === position) {
          return last.isNext ? "X" : "O";
        }
        return square;
      });
      return prev.concat({ board: newBoard, isNext: !last.isNext });
    });
    setCurrentmove((prev) => prev + 1);
  };
  const moveTo = (move) => {
    setCurrentmove(move);
  };
  const onNewGame = () => {
    sethistory(NEWGAME);
    setCurrentmove(0);
  };
  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <Status winner={winner} current={current} />
      <Board
        board={current.board}
        handleSquareclick={handleSquareclick}
        winningSquares={winningSquares}
      />
      <button
        type="button"
        onClick={onNewGame}
        className={`btn-reset ${winner ? "active" : ""}`}
      >
        Strart new game
      </button>
      <h2 style={{ fontWeight: "normal" }}>Current game history</h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls" />
    </div>
  );
}

export default App;
