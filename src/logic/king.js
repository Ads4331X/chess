export class King {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.type = "king";
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

  getAttackSquares() {
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

    const attacks = [];

    for (let [rOff, cOff] of kingMoveArea) {
      const newRow = this.row + rOff;
      const newCol = this.col + cOff;

      if (newRow < 0 || newRow > 7 || newCol < 0 || newCol > 7) continue;
      attacks.push([newRow, newCol]);
    }

    return attacks;
  }

  show() {
    this.#availablePaths();

    this.legalMoves = [];

    for (const [r, c] of this.kingPath) {
      if (this.board.__board__.isLegalMove(this, this.row, this.col, r, c)) {
        this.legalMoves.push([r, c]);
      }
    }

    return this.legalMoves;
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) {
      return false;
    }
    const target = this.board[toRow][toCol];

    if (target) this.board.__board__.playCaptureSound();
    else this.board.__board__.playMoveSound();

    const king = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = king;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;
    this.board.__board__.afterMove();
  }

  move(toRow, toCol) {
    this.show();

    const movableSet = new Set(this.legalMoves.map(([r, c]) => `${r},${c}`));

    if (movableSet.has(`${toRow},${toCol}`)) {
      this.#move(this.row, this.col, toRow, toCol);
    }

    return this.show();
  }
}
