export function simulate() {
  let board = sample()
  loop(board)
}

function loop(board: boolean[][], count: number = 0) {
  console.log("loop " + count)
  console.log(toString(board))
  setInterval(() => {
    board = interate(board);
    loop(board, count++)
  }, 1000)
}

export function init(size = 10): boolean[][] {
  let board = []
  for (let i = 0; i < size; i++) {
    const row = []
    for (let j = 0; j < size; j++) {
      row.push(false)
    }
    board.push(row);
  }

  return board;
}

export function sample() {
  let board = init();
  board[0][1] = true;
  board[1][2] = true;
  board[2][0] = true;
  board[2][1] = true;
  board[2][2] = true;

  return board;
}

export function interate(board: boolean[][]): boolean[][] {
  const newboard = init();
  const size = board.length;

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const count = neighbours(board, i, j);
      if (isAlive(board, i, j)) {
        if (count ===3 || count === 2) {
          newboard[i][j] = true;
        } 
      } else {
        if (count === 3) {
          newboard[i][j] = true;
        }
      }
    }
  }

  return newboard;
}
function isAlive(board: boolean[][], row: number, col: number): boolean {
  if (row < 0 || col < 0 || col > 9 || row > 9) {
    return false
  }

  return board[row][col];
}

export function neighbours(board: boolean[][], row: number, col: number): number {
  let count = 0;
  const size = board.length;
  for (let i of [-1, 0, 1]) {
    for (let j of [-1, 0, 1]) {
      if (!(i ===0 && j === 0)) {
        if (isAlive(board, row+i, col+j)) {
          count += 1;
        }
      }
    }
  }

  return count
}

export function toString(board: boolean[][]): string {
  let output = ""
  const size = board.length; // assume square
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cell = board[i][j];
      output += (cell ? "o" : '_')
    }
    output += "\n"
  }

  return output
}
