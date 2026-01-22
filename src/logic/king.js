export class King {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.kingPath = [];
  }
  #availablePaths() {}

  show() {
    this.#availablePaths();
    return this.kingPath;
  }

  move(toRow, toCol) {}
}
