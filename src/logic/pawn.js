export default class Pawn {
  constructor(type = "pawn", color, row, col, board, name) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.pawnPath = [];
    this.direction = color === "b" ? 1 : -1;
  }

  #isValid(pos) {
    return pos >= 0 && pos <= 7;
  }

  #canMove2Step(row) {
    return (
      (row === 1 && this.color === "b") || (row === 6 && this.color === "w")
    );
  }

  #checkEnpassant() {
    const lastMove = this.board.__board__.lastMove;
    if (!lastMove) return;

    if (
      lastMove.pieceType !== "pawn" ||
      lastMove.color === this.color ||
      !lastMove.wasDoubleStep
    )
      return;

    if (
      (this.color === "w" && this.row !== 3) ||
      (this.color === "b" && this.row !== 4)
    )
      return;

    if (Math.abs(this.col - lastMove.toCol) !== 1) return;

    const targetRow = this.row + this.direction;
    const targetCol = lastMove.toCol;

    this.pawnPath.push([targetRow, targetCol]);
  }

  #availablePath() {
    this.pawnPath = [];

    const nextRow = this.row + this.direction;

    // Single step forward
    if (this.#isValid(nextRow) && !this.board[nextRow][this.col]) {
      this.pawnPath.push([nextRow, this.col]);

      // Double step forward
      const twoStepsRow = this.row + 2 * this.direction;
      if (
        this.#canMove2Step(this.row) &&
        this.#isValid(twoStepsRow) &&
        !this.board[twoStepsRow][this.col]
      ) {
        this.pawnPath.push([twoStepsRow, this.col]);
      }
    }

    // Captures
    for (const c of [this.col - 1, this.col + 1]) {
      if (!this.#isValid(c) || !this.#isValid(nextRow)) continue;

      const diagSquare = this.board[nextRow][c];
      if (diagSquare && diagSquare.color !== this.color) {
        this.pawnPath.push([nextRow, c]);
      }
    }

    // en passant
    this.#checkEnpassant();
  }

  // Attack squares for check detection
  getAttackSquares() {
    const attacks = [];
    const nextRow = this.row + this.direction;

    for (const c of [this.col - 1, this.col + 1]) {
      if (!this.#isValid(c) || !this.#isValid(nextRow)) continue;
      attacks.push([nextRow, c]);
    }

    return attacks;
  }

  #isPromotionRank() {
    return (
      (this.color === "w" && this.row === 0) ||
      (this.color === "b" && this.row === 7)
    );
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) return false;

    const pawn = this.board[fromRow][fromCol];

    // en passant capture
    if (fromCol !== toCol && !this.board[toRow][toCol]) {
      const capturedPawnRow = toRow - this.direction;
      this.board[capturedPawnRow][toCol] = null;
    }

    this.board[toRow][toCol] = pawn;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;

    this.board.__board__.recordMove(pawn, fromRow, fromCol, toRow, toCol);

    if (this.#isPromotionRank()) {
      this.board.__board__.pendingPromotion = {
        row: this.row,
        col: this.col,
        color: this.color,
      };
      return;
    }

    this.board.__board__.switchTurn();
  }

  move(toRow, toCol) {
    this.#availablePath();
    const movableSet = new Set(this.pawnPath.map(([r, c]) => `${r},${c}`));

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
    this.#availablePath();
    return this.pawnPath;
  }
}
