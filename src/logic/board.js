export class Board {
  constructor() {
    this.representRow = ["a", "b", "c", "d", "e", "f", "g", "h"];
    this.representCol = ["8", "7", "6", "5", "4", "3", "2", "1"];
    this.board = this.#initializeBoard();
    this.turn = "w";
  }

  #initializeBoard() {
    this.board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    return this.board;
  }
  switchTurn() {
    this.turn = this.turn === "w" ? "b" : "w";
  }
  isTurn(color) {
    return this.turn === color;
  }
  Display() {
    return this.board;
  }
}
