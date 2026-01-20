import { Pieces } from "./pieces";

export default class Pawn extends Pieces {
  constructor(type = "pawn", color, row, col, board) {
    super(color, board);
    this.type = type;
    this.color = color;
    this.row = row;
    this.col = col;
    this.pawnPositons = [];
    this.direction = 0;
  }

  #canMove2Step(row, pawnColor) {
    return (row === 1 && pawnColor === "b") || (row === 6 && pawnColor === "w");
  }

  #availablePath() {
    this.pawnPath = [];

    // Get pawn color
    const piece = this.board.board[this.row][this.col];
    if (!piece) return;
    const pawnColor = piece[0];

    // Determine movement direction
    this.direction = pawnColor === "b" ? 1 : -1;

    const nextRow = this.row + this.direction;

    // Single step forward
    if (this.#isValid(nextRow) && !this.board.board[nextRow][this.col]) {
      this.pawnPath.push([nextRow, this.col]);

      // Double step forward
      const twoStepsRow = this.row + 2 * this.direction;
      if (
        this.#canMove2Step(this.row, pawnColor) &&
        this.#isValid(twoStepsRow) &&
        !this.board.board[twoStepsRow][this.col]
      ) {
        this.pawnPath.push([twoStepsRow, this.col]);
      }
    }

    //  Diagonal captures
    const diagonals = [this.col - 1, this.col + 1];
    for (const c of diagonals) {
      if (!this.#isValid(c) || !this.#isValid(nextRow)) continue;

      const diagSquare = this.board.board[nextRow][c];
      if (diagSquare && diagSquare[0] !== pawnColor) {
        this.pawnPath.push([nextRow, c]);
      }
    }
  }
  #isValid(pos) {
    return pos >= 0 && pos <= 7;
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }
    const pawn = this.board.board[fromRow][fromCol];
    this.board.board[toRow][toCol] = pawn;
    this.board.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;

    this.board.switchTurn();
  }
  movePawn(toRow, toCol) {
    this.#availablePath();
    this.pawnPathSet = new Set(
      this.pawnPath.map(([row, col]) => `${row},${col}`),
    );
    if (this.pawnPathSet.has(`${toRow},${toCol}`))
      this.#move(this.row, this.col, toRow, toCol);

    return this.show();
  }

  show() {
    this.#availablePath();
    this.pawnPathSet = new Set(
      this.pawnPath.map(([row, col]) => `${row},${col}`),
    );
    // console.log(this.pawnPathSet);
    return this.pawnPath;
  }
}
