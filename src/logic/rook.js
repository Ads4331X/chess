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
      if (square === null) this.rookPath.push([i, this.col]);
      else if (square.color !== rookColor && square.name[1] === "K")
        this.rookPath.push([i, this.col]);
      else if (square.color !== rookColor) {
        // stop after capturing enemy piece
        this.rookPath.push([i, this.col]);
        break; // stop after capturing
      } else {
        this.attackedSquares.push(...this.rookPath);
        this.attackedSquares.push([i, this.col]);
        break; // same color piece}
      }
    }
    // DOWN
    for (let i = this.row + 1; i < 8; i++) {
      const square = this.board[i][this.col];

      if (square === null) this.rookPath.push([i, this.col]);
      else if (square.color !== rookColor && square.name[1] === "K")
        this.rookPath.push([i, this.col]);
      else if (square.color !== rookColor) {
        this.rookPath.push([i, this.col]);
        break;
      } else {
        this.attackedSquares.push(...this.rookPath);
        this.attackedSquares.push([i, this.col]);
        break; // same color piece}
      }
    }

    // LEFT
    for (let i = this.col - 1; i >= 0; i--) {
      const square = this.board[this.row][i];
      if (square === null) this.rookPath.push([this.row, i]);
      else if (square.color !== rookColor && square.name[1] === "K")
        this.rookPath.push([this.row, i]);
      else if (square.color !== rookColor) {
        this.rookPath.push([this.row, i]);
        break;
      } else {
        this.attackedSquares.push(...this.rookPath);
        this.attackedSquares.push([i, this.col]);
        break; // same color piece}
      }
    }

    // RIGHT
    for (let i = this.col + 1; i < 8; i++) {
      const square = this.board[this.row][i];
      if (square === null) this.rookPath.push([this.row, i]);
      else if (square.color !== rookColor && square.name[1] === "K")
        this.rookPath.push([this.row, i]);
      else if (square.color !== rookColor) {
        this.rookPath.push([this.row, i]);
        break;
      } else {
        this.attackedSquares.push(...this.rookPath);
        this.attackedSquares.push([i, this.col]);
        break; // same color piece}
      }
    }
  }

  getAttackSquares() {
    this.#rookPath();
    return this.attackedSquares;
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
    if (!this.board.__board__.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }

    let current = this.board[fromRow][fromCol]; // rook
    if (!current) return;
    this.board[toRow][toCol] = current; // move the rook
    this.board[fromRow][fromCol] = null; // empty the previous sopt
    this.row = toRow; // make the moved row the new row
    this.col = toCol; // make the moved col the new col

    this.board.__board__.switchTurn();
  }
}
