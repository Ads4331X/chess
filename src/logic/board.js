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

  isSquareAttacked(x, y, byColor) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (!piece || piece.color !== byColor) continue;
        if (typeof piece.getAttackSquares !== "function") continue;
        for (let [ar, ac] of piece.getAttackSquares()) {
          if (ar === x && ac === y) return true;
        }
      }
    }
    return false;
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
