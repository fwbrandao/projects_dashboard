import { useState } from "react";

export type Cell = 'X' | 'O' | null;

export type BoardState = Cell[];
const createBoardState = () => Array<Cell>(9).fill(null);

const victories = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkForWinner(boardState: BoardState) {
  for (let i = 0; i < victories.length; i++) {
    const [cell1, cell2, cell3] = victories[i];
      if (boardState[cell1] && boardState[cell1] === boardState[cell2] && boardState[cell1] === boardState[cell3]) {
        return boardState[cell1];
      }
  }

  return null;
}

export type GameState = {
  history: BoardState[],
  step: number,
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>({
    history: [createBoardState()],
    step: 0,
  });

  const current = gameState.history[gameState.step];
  const nextToPlay = (gameState.step % 2) === 0;
  const winner = checkForWinner(current);

  function handleCellClick(square: number) {

    const history = gameState.history.slice(0, gameState.step + 1);
    const boardState = history[history.length - 1];
    if (checkForWinner(boardState) || boardState[square]) {
      return;
    }
    const newBoardState = boardState.slice();
    newBoardState[square] = (gameState.step % 2) === 0 ? 'X' : 'O';
    history.push(newBoardState);
    setGameState({
      history: history,
      step: history.length - 1,
    });
  }

  const reasetGame = () => {
    setGameState({
      history: [createBoardState()],
      step: 0,
    });
  }

  return {
    winner,
    gameState,
    current,
    nextToPlay,
    handleCellClick,
    reasetGame
  };
}