const world = "world"

export function hello(word: string = world): string {
  return `Hello  ${word}`
}

(function () {
  console.log(hello())
})();
