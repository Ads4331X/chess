import { Pieces } from "./pieces";

export class King extends Pieces {
  constructor(color, row, col, board) {
    super(color, board);
    this.row = row;
    this.col = col;
    this.kingPath = [];
  }
  #availablePaths() {}
}
