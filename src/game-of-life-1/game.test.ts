import * as game from "./game";

test("init a game board of size 10", () => {
  const board = game.init();
  expect(board.length).toBe(10)
  expect(board[0].length).toBe(10)
})

test("sample game board has some organisms in it", () => {
  const board = game.sample();

  expect(board.length).toBe(10)
  expect(board[0].length).toBe(10)

  expect(board[0][1]).toBe(true)
  expect(board[0][0]).toBe(false)
  expect(board[1][2]).toBe(true)
  expect(board[2][0]).toBe(true)
  expect(board[2][1]).toBe(true)
  expect(board[2][2]).toBe(true)
})

test("calculate one cycle", () => {
  let board = game.sample()
  let output = game.toString(board)
  board = game.interate(board)

  expect(board[0][1]).toBe(false)
  expect(board[1][0]).toBe(true)
  expect(board[1][1]).toBe(false)
  expect(board[1][2]).toBe(true)
  expect(board[2][0]).toBe(false)
  expect(board[2][1]).toBe(true)
  expect(board[2][2]).toBe(true)
})

test("count neighbours of cell", () => {
  const board = game.sample()

  expect(game.neighbours(board, 1,1)).toBe(5)
  expect(game.neighbours(board, 1,2)).toBe(3)
  expect(game.neighbours(board, 0,0)).toBe(1)
  expect(game.neighbours(board, 9,0)).toBe(0)
  expect(game.neighbours(board, 0,9)).toBe(0)
})
