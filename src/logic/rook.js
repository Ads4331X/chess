export default class Rook {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.rookPath = [];
  }

  show() {
    this.rookPath = [];
    this.#rookPath();
    this.rookPathSet = new Set(this.rookPath.map(([r, c]) => `${r},${c}`));
    // console.log(this.rookPathSet);
    return this.rookPath;
  }

  #rookPath() {
    const currentRook = this.board[this.row][this.col];
    if (!currentRook) return;
    let rookColor = this.color;

    // UP
    for (let i = this.row - 1; i >= 0; i--) {
      const square = this.board[i][this.col];
      if (square === null) {
        this.rookPath.push([i, this.col]);
      } else if (square.color !== rookColor) {
        // stop after capturing enemy piece
        this.rookPath.push([i, this.col]);
        break; // stop after capturing
      } else break; // same color piece
    }

    // DOWN
    for (let i = this.row + 1; i < 8; i++) {
      const square = this.board[i][this.col];

      if (square === null) this.rookPath.push([i, this.col]);
      else if (square.color !== rookColor) {
        this.rookPath.push([i, this.col]);
        break;
      } else break;
    }

    // LEFT
    for (let i = this.col - 1; i >= 0; i--) {
      const square = this.board[this.row][i];
      if (square === null) this.rookPath.push([this.row, i]);
      else if (square.color !== rookColor) {
        this.rookPath.push([this.row, i]);
        break;
      } else break;
    }

    // RIGHT
    for (let i = this.col + 1; i < 8; i++) {
      const square = this.board[this.row][i];
      if (square === null) this.rookPath.push([this.row, i]);
      else if (square.color !== rookColor) {
        this.rookPath.push([this.row, i]);
        break;
      } else break;
    }
  }

  move(toRow, toCol) {
    this.rookPath = [];
    this.#rookPath();
    this.rookPathSet = new Set(this.rookPath.map(([r, c]) => `${r},${c}`));

    if (this.rookPathSet.has(`${toRow},${toCol}`)) {
      this.#move(this.row, this.col, toRow, toCol);
    }
    return this.show();
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }
    let current = this.board[fromRow][fromCol]; // rook
    if (!current) return;
    this.board[toRow][toCol] = current; // move the rook
    this.board[fromRow][fromCol] = null; // empty the previous sopt
    this.row = toRow; // make the moved row the new row
    this.col = toCol; // make the moved col the new col

    this.board.switchTurn();
  }
}
