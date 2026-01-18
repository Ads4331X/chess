import { Pieces } from "./pieces";

export default class Pawn extends Pieces {
  constructor(type = "pawn", color, row, col, board) {
    super(color, board);
    this.type = type;
    this.color = color;
    this.row = row;
    this.col = col;
    this.pawnPositons = [];
    this.#knowPawnPosition();
  }

  /**
   * to find the positions of the pawns and store it in array
   **/
  #knowPawnPosition() {
    // checks the entire board and looks for the pawns
    this.pawnPositons = []; // Clear pawn positions before recalculating
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (
          this.board.board[r][c] === "bP" ||
          this.board.board[r][c] === "wP"
        ) {
          this.pawnPositons.push([r, c]); // get the position of the pawns in array
        }
      }
    }
  }

  /** checks for promotion of the pawn
   * @return {boolean} true or false
   */
  #checkPromotion() {
    // checks the last col of white and black pawns to check for promotion
    for (let c = 0; c < 8; c++) {
      if (this.board.board[0][c] === "wP") {
        this.board.board[0][c] = "wQ"; // promote to white queen
      }
      if (this.board.board[7][c] === "bP") {
        this.board.board[7][c] = "bQ"; // promote to black queen
      }
    }
  }

  /**
   * checks if a pawn can move 2 squares or not
   * @return {boolean} true or false
   */
  #canMove2Step() {
    if (this.color === "white" && this.row === 6) return true;
    if (this.color === "black" && this.row === 1) return true;
    return false;
  }

  /**
   * checks if a pawn can capture a piece or not
   * @param {Number} toRow
   * @param {Number} toCol
   * @return {boolean} true or false
   */
  #canCapture(toRow, toCol) {
    const target = this.board.board[toRow][toCol];
    if (!target) return false;
    let rowDiff = Math.abs(toRow - this.row);
    let colDiff = Math.abs(toCol - this.col);

    return (
      (this.color === "white" && // for white pawns checks if white pawns can capture or not
        rowDiff === 1 &&
        colDiff === 1 &&
        target.startsWith("b")) ||
      (this.color === "black" && // for black pawns checks if black pawns can capture or not
        rowDiff === 1 &&
        colDiff === 1 &&
        target.startsWith("w"))
    );
  }

  /** moves a piece from its initial position to new position */
  #move(fromRow, fromCol, toRow, toCol) {
    const current = this.board.board[fromRow][fromCol];
    if (!current) {
      console.error("No piece at this position!");
      return;
    }

    this.board.board[toRow][toCol] = current; // keep the piece (wP or bP)
    this.board.board[fromRow][fromCol] = null;

    // update pawn's internal position
    this.row = toRow;
    this.col = toCol;

    this.#checkPromotion();
  }

  /**
   * move the pawn also movement breaks the rule of chess returns;
   * @param {Number} toRow
   * @param {Number} toCol
   */
  movePawn(toRow, toCol) {
    const rowDiff = toRow - this.row;
    const direction = this.color === "white" ? -1 : 1;
    const target = this.board.board[toRow][toCol];
    const colDiff = toCol - this.col;

    // check illegal move
    if (
      // forward move blocked by piece
      (colDiff === 0 && target) ||
      // forward move is not 1 or 2 steps
      (colDiff === 0 &&
        rowDiff !== direction &&
        !(rowDiff === 2 * direction && this.#canMove2Step())) ||
      // 2-step move blocked in middle
      (colDiff === 0 &&
        rowDiff === 2 * direction &&
        this.board.board[this.row + direction][toCol]) ||
      // diagonal move but cannot capture
      (Math.abs(colDiff) === 1 &&
        rowDiff === direction &&
        !this.#canCapture(toRow, toCol)) ||
      // anything else is illegal
      Math.abs(colDiff) > 1 ||
      (Math.abs(colDiff) === 0 && rowDiff === 0)
    ) {
      return false;
    }

    this.#move(this.row, this.col, toRow, toCol);
    this.#updatePawnPositions();
    return true; // Return true on successful move
  }

  #updatePawnPositions() {
    this.#knowPawnPosition(); // Update the pawn positions after each move
  }
}
