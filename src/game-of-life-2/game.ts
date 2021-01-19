export function simulate() {
  console.log("implement game of life")
}
type Board = boolean[][];
export class Game {
  private SIZE: number;
  board: Board

  constructor(size: number = 10) {
    this.SIZE = size;
    this.board = this.init(size)
  }

  aliveCells() {
    return this.SIZE;
  }

  getBoard(): Board {
    return this.board;
  }

  simulate() {
    this.loop();
  }

  loop(generation = 1) {
    setTimeout(() => {
      console.log("Generation: " + generation)
      console.log(this.toString())
      this.iterate()
      this.loop(generation + 1)
    }, 1000)
  }

  seed() {
    this.board[0][1] = true;
    this.board[1][2] = true;
    this.board[2][0] = true;
    this.board[2][1] = true;
    this.board[2][2] = true;
  }

  toString(): string {
    let output = "";
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        output += this.isAlive(i,j) ? "x" : "_";
      }
      output += "\n"
    }

    return output;
  }

  private init(size: number): boolean[][] {
    let result = []
    for (let i = 0; i < size; i++) {
      let row = []
      for (let j = 0; j < size; j++) {
        row.push(false)
      }
      result.push(row)
    }

    return result;
  }

  iterate() {
    let newState = this.init(this.SIZE);

    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        const neighbours = this.neighboursAt(i,j);
        if (this.isAlive(i,j)) {
          if ((neighbours === 2 || neighbours===3)) {
            newState[i][j] = true;
          }
        } else {
          if (neighbours ===3) {
            newState[i][j] = true;
          }
        }
      }
    }
    this.board = newState;
  }

  neighboursAt(row: number, col: number): number {
    let count = 0;
    for (let i of [-1, 0, 1]) {
      for (let j of [-1, 0, 1]) {
        if (this.isAlive(row + i, col + j)) {
          if (!(i ===0 && j === 0)) {
            count += 1;
          }
        }
      }
    }
    return count;
  }

  isAlive(row: number, col: number): boolean {
    if (row < 0 || col < 0 || row > this.SIZE -1 || col > this.SIZE - 1) {
      return false;
    }
    return this.board[row][col];
  }

  setAlive(row: number, col: number): void {
    this.board[row][col] = true;
  }
}
