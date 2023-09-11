import { useState } from "react"

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(index);
  }

  return (
    <div onClick={handleClick} className={ className }>
      { children }
    </div>
  )
}

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {
    if (board[index] == null && winner == null) {
      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);
      const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
      const newWinner = checkWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      }
    }
  }

  const checkWinner = (boardToCheck) => {
    // Check rows
    for (let row = 0; row < 3; row++) {
      const startRow = row * 3;
      if (
        boardToCheck[startRow] &&
        boardToCheck[startRow] === boardToCheck[startRow + 1] &&
        boardToCheck[startRow] === boardToCheck[startRow + 2]
      ) {
        return boardToCheck[startRow];
      }
    }
  
    // Check columns
    for (let col = 0; col < 3; col++) {
      if (
        boardToCheck[col] &&
        boardToCheck[col] === boardToCheck[col + 3] &&
        boardToCheck[col] === boardToCheck[col + 6]
      ) {
        return boardToCheck[col];
      }
    }
  
    // Check diagonal
    if (
      boardToCheck[0] &&
      boardToCheck[0] === boardToCheck[4] &&
      boardToCheck[0] === boardToCheck[8]
    ) {
      return boardToCheck[0];
    }
    if (
      boardToCheck[2] &&
      boardToCheck[2] === boardToCheck[4] &&
      boardToCheck[2] === boardToCheck[6]
    ) {
      return boardToCheck[2];
    }
  
    // Check for a draw (no empty cells)
    if (!boardToCheck.includes(null)) {
      return setWinner(false);
    }
  
    // If no winner and the game is not over
    return null;
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        { board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
            )
        }) }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>{ winner == false ? 'Empate' : 'Ganó:' }</h2>
              
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>
              
              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
