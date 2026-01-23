export class King {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.kingPath = [];
    this.legalMoves = [];
  }

  #isValid(check) {
    return check <= 7 && check >= 0;
  }
  #availablePaths() {
    this.kingPath = [];
    const kingMoveArea = [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    for (let [rOff, cOff] of kingMoveArea) {
      const newRow = this.row + rOff;
      const newCol = this.col + cOff;

      if (!this.#isValid(newRow) || !this.#isValid(newCol)) continue;

      const square = this.board[newRow][newCol];
      if (!square || square.color !== this.color) {
        this.kingPath.push([newRow, newCol]);
      }
    }

    this.#legalMoves();
  }

  #legalMoves() {
    const enemyColor = this.color === "w" ? "b" : "w";
    this.legalMoves = this.kingPath.filter(
      ([r, c]) => !this.board.__board__.isSquareAttacked(r, c, enemyColor),
    );
  }

  show() {
    this.#availablePaths();
    return this.legalMoves;
  }

  #isCheck(toRow, toCol) {}
  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) {
      // console.log("Not your turn!");
      return false;
    }

    const king = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = king;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;
    this.board.__board__.switchTurn();
  }

  move(toRow, toCol) {
    this.#availablePaths();
    this.movableSet = new Set(
      this.legalMoves.map(([row, col]) => `${row},${col}`),
    );

    if (this.movableSet.has(`${toRow},${toCol}`)) {
      this.#move(this.row, this.col, toRow, toCol);
    }

    return this.show();
  }
}
