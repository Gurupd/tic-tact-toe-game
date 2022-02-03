import React from "react";

const Square = ({ value, onClick, isWinningSquares }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{ fontWeight: isWinningSquares ? "bold" : "normal" }}
      className={`square ${isWinningSquares ? "winning" : ""}${
        value === "X" ? "text-green" : "text-orange"
      }`}
    >
      {value}
    </button>
  );
};

export default Square;
