export default class Pawn {
  constructor(type = "pawn", color, row, col, board, name) {
    this.name = name;
    this.type = type;
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.pawnPath = [];
    this.attackedSquare = [];
    this.direction = 0;
  }

  #isValid(pos) {
    return pos >= 0 && pos <= 7;
  }

  #canMove2Step(row, pawnColor) {
    return (row === 1 && pawnColor === "b") || (row === 6 && pawnColor === "w");
  }

  #checkEnpassan() {
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
    this.attackedSquare = [];

    const pawnColor = this.color;
    const piece = this.board[this.row][this.col];
    if (!piece) return;

    this.direction = pawnColor === "b" ? 1 : -1;
    const nextRow = this.row + this.direction;

    // Single step forward
    if (this.#isValid(nextRow) && !this.board[nextRow][this.col]) {
      this.pawnPath.push([nextRow, this.col]);

      // Double step forward
      const twoStepsRow = this.row + 2 * this.direction;
      if (
        this.#canMove2Step(this.row, pawnColor) &&
        this.#isValid(twoStepsRow) &&
        !this.board[twoStepsRow][this.col]
      ) {
        this.pawnPath.push([twoStepsRow, this.col]);
      }
    }

    // Diagonal attack squares (attacked by pawn)
    const diagonals = [this.col - 1, this.col + 1];
    for (const c of diagonals) {
      if (!this.#isValid(c) || !this.#isValid(nextRow)) continue;

      // Always mark diagonals as attacked
      this.attackedSquare.push([nextRow, c]);

      const diagSquare = this.board[nextRow][c];
      if (diagSquare && diagSquare.color !== pawnColor) {
        this.pawnPath.push([nextRow, c]); // can capture
      }
    }
    this.#checkEnpassan();
  }

  getAttackSquares() {
    this.#availablePath();
    return this.attackedSquare;
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

    // enpassant
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
