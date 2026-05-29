import { useState } from 'react'

type Cell = 'X' | 'O' | null

const LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
]

function winner(board: Cell[]): { player: Cell; line: number[] } | null {
  for (const line of LINES) {
    const [a, b, c] = line
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line }
    }
  }
  return null
}

export default function TicTacToe() {
  const [history, setHistory] = useState<Cell[][]>([Array(9).fill(null)])
  const [step, setStep] = useState(0)
  const board = history[step]
  const xIsNext = step % 2 === 0
  const win = winner(board)
  const full = board.every(Boolean)

  const play = (i: number) => {
    if (board[i] || win) return
    const next = board.slice()
    next[i] = xIsNext ? 'X' : 'O'
    const trimmed = history.slice(0, step + 1)
    setHistory([...trimmed, next])
    setStep(trimmed.length)
  }

  const reset = () => {
    setHistory([Array(9).fill(null)])
    setStep(0)
  }

  const status = win
    ? `Winner: ${win.player}`
    : full
      ? 'Draw'
      : `Next: ${xIsNext ? 'X' : 'O'}`

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="font-display text-lg font-bold text-text" role="status">{status}</p>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, i) => {
          const isWin = win?.line.includes(i)
          return (
            <button
              key={i}
              onClick={() => play(i)}
              aria-label={`Square ${i + 1}${cell ? `, ${cell}` : ', empty'}`}
              className={`grid h-20 w-20 place-items-center rounded-DEFAULT border text-3xl font-extrabold transition-colors sm:h-24 sm:w-24 ${
                isWin ? 'border-primary bg-primary-soft text-primary' : 'border-border bg-surface-2 text-text hover:bg-surface-hover'
              }`}
            >
              {cell}
            </button>
          )
        })}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={reset}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-bg transition-transform hover:scale-[1.03]"
        >
          New game
        </button>
        {history.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {history.map((_, move) => (
              <button
                key={move}
                onClick={() => setStep(move)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  move === step ? 'border-primary text-primary' : 'border-border text-muted hover:text-text'
                }`}
              >
                {move === 0 ? 'Start' : `#${move}`}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
