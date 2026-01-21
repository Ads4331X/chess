export default class Pawn {
  constructor(type = "pawn", color, row, col, board, name) {
    // super(color, board);
    this.name = name;
    this.type = type;
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.pawnPositons = [];
    this.direction = 0;
  }

  #canMove2Step(row, pawnColor) {
    return (row === 1 && pawnColor === "b") || (row === 6 && pawnColor === "w");
  }

  #availablePath() {
    this.pawnPath = [];

    // Get pawn color
    const piece = this.board[this.row][this.col];
    if (!piece) return;
    const pawnColor = this.color;

    // Determine movement direction
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

    //  Diagonal captures
    const diagonals = [this.col - 1, this.col + 1];
    for (const c of diagonals) {
      if (!this.#isValid(c) || !this.#isValid(nextRow)) continue;

      const diagSquare = this.board[nextRow][c];
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
    const pawn = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = pawn;
    this.board[fromRow][fromCol] = null;
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
    console.log(this.pawnPathSet);
    return this.pawnPath;
  }
}
