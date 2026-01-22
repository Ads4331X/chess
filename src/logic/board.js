import { Pieces } from "./pieces";

export class Board {
  constructor() {
    this.representRow = ["a", "b", "c", "d", "e", "f", "g", "h"]; // representation
    this.representCol = ["8", "7", "6", "5", "4", "3", "2", "1"];
    this.initializeBoard();
    this.turn = "w";
  }

  initializeBoard() {
    this.board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    const pieces = new Pieces("both", this.board);
    pieces.initialize();
    this.board.__board__ = this;
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

  onClick(piece) {
    console.log(piece);
  }
}
