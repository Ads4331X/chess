import { Pieces } from "./pieces";

export class Queen extends Pieces {
  constructor(color, row, col, board) {
    super(color, board);
    this.row = row;
    this.col = col;
    this.queenPath = [];
  }
}
