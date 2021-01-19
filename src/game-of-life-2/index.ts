import * as game from "./game"

(async function main() {
  const instance = new game.Game();
  instance.seed()

  instance.simulate();
})()
