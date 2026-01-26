export default class Rook {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.rookPath = [];
    this.attackedSquares = [];
  }

  show() {
    this.rookPath = [];
    this.attackedSquares = [];
    this.#rookPath();
    this.rookPathSet = new Set(this.rookPath.map(([r, c]) => `${r},${c}`));
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
        this.attackedSquares.push([i, this.col]);
      } else if (square.color !== rookColor) {
        this.rookPath.push([i, this.col]);
        this.attackedSquares.push([i, this.col]);
        break;
      } else {
        this.attackedSquares.push([i, this.col]);
        break;
      }
    }

    // DOWN
    for (let i = this.row + 1; i < 8; i++) {
      const square = this.board[i][this.col];

      if (square === null) {
        this.rookPath.push([i, this.col]);
        this.attackedSquares.push([i, this.col]);
      } else if (square.color !== rookColor) {
        this.rookPath.push([i, this.col]);
        this.attackedSquares.push([i, this.col]);
        break;
      } else {
        this.attackedSquares.push([i, this.col]);
        break;
      }
    }

    // LEFT
    for (let i = this.col - 1; i >= 0; i--) {
      const square = this.board[this.row][i];

      if (square === null) {
        this.rookPath.push([this.row, i]);
        this.attackedSquares.push([this.row, i]);
      } else if (square.color !== rookColor) {
        this.rookPath.push([this.row, i]);
        this.attackedSquares.push([this.row, i]);
        break;
      } else {
        this.attackedSquares.push([this.row, i]);
        break;
      }
    }

    // RIGHT
    for (let i = this.col + 1; i < 8; i++) {
      const square = this.board[this.row][i];

      if (square === null) {
        this.rookPath.push([this.row, i]);
        this.attackedSquares.push([this.row, i]);
      } else if (square.color !== rookColor) {
        this.rookPath.push([this.row, i]);
        this.attackedSquares.push([this.row, i]);
        break;
      } else {
        this.attackedSquares.push([this.row, i]);
        break;
      }
    }
  }

  getAttackSquares() {
    this.show();
    return this.attackedSquares;
  }

  move(toRow, toCol) {
    this.#rookPath();
    const movableSet = new Set(this.rookPath.map(([r, c]) => `${r},${c}`));

    if (movableSet.has(`${toRow},${toCol}`)) {
      if (
        !this.board.__board__.isLegalMove(
          this,
          this.row,
          this.col,
          toRow,
          toCol,
        )
      ) {
        return this.show();
      }

      this.#move(this.row, this.col, toRow, toCol);
    }
    return this.show();
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) return false;

    let current = this.board[fromRow][fromCol];
    if (!current) return;
    this.board[toRow][toCol] = current;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;

    this.board.__board__.switchTurn();
  }
}
