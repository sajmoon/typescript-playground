import * as game from "./game";

test("#init creates an empty board", () => {
  const instance = new game.Game()
  expect(instance.aliveCells()).toBe(10);
  expect(instance.getBoard().length).toBe(10)
  expect(instance.getBoard()[0].length).toBe(10)
})

test("can count the neighours of all cells if empty", () => {
  const instance = new game.Game();
  let cellCount = 0
  for (let i = 0; i < 10; ++i) {
    for (let j = 0; j < 10; ++j) {
      expect(instance.neighboursAt(i,j)).toBe(0)
      cellCount += 1;
    }
  }
  expect(cellCount).toBe(100)
})

test("#isAlive/2", () => {
  const instance = new game.Game();
  instance.setAlive(1,1)

  expect(instance.isAlive(1,1)).toBe(true);
  expect(instance.isAlive(0,0)).toBe(false);
  expect(instance.isAlive(-1,0)).toBe(false);
  expect(instance.isAlive(0,-1)).toBe(false);
  expect(instance.isAlive(0,10)).toBe(false);
  expect(instance.isAlive(10,0)).toBe(false);
})

test("simulate death by underpopulation", () => {
  const instance = new game.Game()
  instance.setAlive(1,1);
  instance.setAlive(2,1);

  instance.iterate();

  expect(instance.isAlive(1,1)).toBe(false);
})

test("simulate revival of dead cell with 3 neighours", () => {
  const instance = new game.Game()
  instance.setAlive(0,0);
  instance.setAlive(2,1);
  instance.setAlive(1,2);

  instance.iterate();

  expect(instance.isAlive(1,1)).toBe(true);
})

test("simulate survival with 2 neighours", () => {
  const instance = new game.Game()
  instance.setAlive(1,1);
  instance.setAlive(2,1);
  instance.setAlive(1,2);

  instance.iterate();

  expect(instance.isAlive(1,1)).toBe(true);
})

test("neighboursAt/2 count all diagonals", () => {
  const instance = new game.Game()
  instance.setAlive(0,0)
  instance.setAlive(2,0)
  instance.setAlive(0,2)
  instance.setAlive(2,2)
  expect(instance.neighboursAt(1,1)).toBe(4);
})

test("neighboursAt/2 count all sides", () => {
  const instance = new game.Game()
  instance.setAlive(1,0)
  instance.setAlive(1,2)
  instance.setAlive(0,1)
  instance.setAlive(2,1)
  expect(instance.neighboursAt(1,1)).toBe(4);
})

test("neighboursAt/2 does not count self", () => {
  const instance = new game.Game()
  instance.setAlive(1,1)
  expect(instance.neighboursAt(1,1)).toBe(0);
})

