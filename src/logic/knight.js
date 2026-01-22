export default class Knight {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.knightPath = [];
  }

  #isValid(check) {
    return check <= 7 && check >= 0;
  }

  #availablePath() {
    this.knightPath = [];

    this.knightPath = [];
    const knightColor = this.color;

    // all 8 possible moves as [rowOffset, colOffset]
    const moves = [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ];

    for (const [rOff, cOff] of moves) {
      const newRow = this.row + rOff;
      const newCol = this.col + cOff;

      if (!this.#isValid(newRow) || !this.#isValid(newCol)) continue;

      const square = this.board[newRow][newCol];
      if (!square || square.color !== knightColor) {
        this.knightPath.push([newRow, newCol]);
      }
    }
  }

  show() {
    this.#availablePath();
    this.movableSet = new Set(
      this.knightPath.map(([row, col]) => `${row},${col}`),
    );
    // console.log(this.movableSet);

    return this.knightPath;
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }

    const knight = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = knight;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;
    this.board.__board__.switchTurn();
  }
  move(toRow, toCol) {
    this.#availablePath();
    this.movableSet = new Set(
      this.knightPath.map(([row, col]) => `${row},${col}`),
    );

    if (this.movableSet.has(`${toRow},${toCol}`)) {
      this.#move(this.row, this.col, toRow, toCol);
    }

    return this.show();
  }
}
