export class Queen {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.queenPath = [];
    this.attackedSquare = [];
  }

  #getColorAndCount() {
    return { count: 1, queenColor: this.color };
  }

  #topLeftPath() {
    let { count, queenColor } = this.#getColorAndCount();

    for (let r = this.row - 1; r >= 0; r--) {
      if (this.col - count < 0) break;
      let square = this.board[r][this.col - count];

      if (!square) this.queenPath.push([r, this.col - count]);
      else if (square.color !== queenColor) {
        this.queenPath.push([r, this.col - count]);
        if (square.name[1] !== "K")
          this.attackedSquare.push([r, this.col - count]);
        break;
      } else break; // blocked by own piece
      this.attackedSquare.push(...this.queenPath);
      count++;
    }
  }

  #topRightPath() {
    let { count, queenColor } = this.#getColorAndCount();

    for (let r = this.row - 1; r >= 0; r--) {
      if (this.col + count > 7) break;
      let square = this.board[r][this.col + count];

      if (!square) this.queenPath.push([r, this.col + count]);
      else if (square.color !== queenColor) {
        this.queenPath.push([r, this.col + count]);
        if (square.name[1] !== "K")
          this.attackedSquare.push([r, this.col + count]);
        break;
      } else break;
      this.attackedSquare.push(...this.queenPath);
      count++;
    }
  }

  #bottomRightPath() {
    let { count, queenColor } = this.#getColorAndCount();

    for (let r = this.row + 1; r <= 7; r++) {
      if (this.col + count > 7) break;
      let square = this.board[r][this.col + count];

      if (!square) this.queenPath.push([r, this.col + count]);
      else if (square.color !== queenColor) {
        this.queenPath.push([r, this.col + count]);
        if (square.name[1] !== "K")
          this.attackedSquare.push([r, this.col + count]);
        break;
      } else break;
      this.attackedSquare.push(...this.queenPath);
      count++;
    }
  }

  #bottomLeftPath() {
    let { count, queenColor } = this.#getColorAndCount();

    for (let r = this.row + 1; r <= 7; r++) {
      if (this.col - count < 0) break;
      let square = this.board[r][this.col - count];

      if (!square) this.queenPath.push([r, this.col - count]);
      else if (square.color !== queenColor) {
        this.queenPath.push([r, this.col - count]);
        if (square.name[1] !== "K")
          this.attackedSquare.push([r, this.col - count]);
        break;
      } else break;
      this.attackedSquare.push(...this.queenPath);
      count++;
    }
  }

  #verticalUp() {
    const { queenColor } = this.#getColorAndCount();
    for (let r = this.row - 1; r >= 0; r--) {
      let square = this.board[r][this.col];
      if (!square) this.queenPath.push([r, this.col]);
      else if (square.color !== queenColor) {
        this.queenPath.push([r, this.col]);
        if (square.name[1] !== "K") this.attackedSquare.push([r, this.col]);
        break;
      } else break;
    }
  }

  #verticalDown() {
    const { queenColor } = this.#getColorAndCount();
    for (let r = this.row + 1; r <= 7; r++) {
      let square = this.board[r][this.col];
      if (!square) this.queenPath.push([r, this.col]);
      else if (square.color !== queenColor) {
        this.queenPath.push([r, this.col]);
        if (square.name[1] !== "K") this.attackedSquare.push([r, this.col]);
        break;
      } else break;
    }
  }

  #horizontalLeft() {
    const { queenColor } = this.#getColorAndCount();
    for (let c = this.col - 1; c >= 0; c--) {
      let square = this.board[this.row][c];
      if (!square) this.queenPath.push([this.row, c]);
      else if (square.color !== queenColor) {
        this.queenPath.push([this.row, c]);
        if (square.name[1] !== "K") this.attackedSquare.push([this.row, c]);
        break;
      } else break;
    }
  }

  #horizontalRight() {
    const { queenColor } = this.#getColorAndCount();
    for (let c = this.col + 1; c <= 7; c++) {
      let square = this.board[this.row][c];
      if (!square) this.queenPath.push([this.row, c]);
      else if (square.color !== queenColor) {
        this.queenPath.push([this.row, c]);
        if (square.name[1] !== "K") this.attackedSquare.push([this.row, c]);
        break;
      } else break;
    }
  }

  // ------------------ Available Paths ------------------
  #availablePaths() {
    this.queenPath = [];
    this.attackedSquare = [];

    // Diagonal moves
    this.#topLeftPath();
    this.#topRightPath();
    this.#bottomLeftPath();
    this.#bottomRightPath();

    // Straight moves
    this.#verticalUp();
    this.#verticalDown();
    this.#horizontalLeft();
    this.#horizontalRight();

    // build set for move checking
    this.queenPathSet = new Set(this.queenPath.map(([r, c]) => `${r},${c}`));
  }

  getAttackSquares() {
    this.#availablePaths();
    return this.attackedSquare;
  }

  // ------------------ Move ------------------
  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) return false;

    const target = this.board[toRow][toCol];
    if (target) this.board[toRow][toCol] = null; // capture enemy

    const queen = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = queen;
    this.board[fromRow][fromCol] = null;

    this.row = toRow;
    this.col = toCol;

    this.board.__board__.switchTurn();
  }

  move(toRow, toCol) {
    this.#availablePaths();
    const movableSet = new Set(this.queenPath.map(([r, c]) => `${r},${c}`));

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

  show() {
    this.#availablePaths();
    return this.queenPath;
  }
}
