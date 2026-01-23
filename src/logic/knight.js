export default class Knight {
  constructor(color, row, col, board, name) {
    this.color = color;
    this.row = row;
    this.col = col;
    this.board = board;
    this.name = name;
    this.knightPath = [];
  }

  #isValid(pos) {
    return pos >= 0 && pos <= 7;
  }

  #availablePath() {
    this.knightPath = [];
    const knightColor = this.color;

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

  isCheckingKing() {
    this.#availablePath();
    const enemyColor = this.color === "w" ? "b" : "w";

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const square = this.board[r][c];
        if (square && square.color === enemyColor && square.name[1] === "K") {
          const kingPos = `${r},${c}`;
          const attackSet = new Set(
            this.knightPath.map(([r, c]) => `${r},${c}`),
          );
          return attackSet.has(kingPos);
        }
      }
    }
    return false;
  }

  show() {
    this.#availablePath();
    return this.knightPath;
  }

  getAttackSquares() {
    return this.show();
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) return false;

    const knight = this.board[fromRow][fromCol];
    if (!knight) return;

    this.board[toRow][toCol] = knight;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;

    this.board.__board__.switchTurn();
  }

  move(toRow, toCol) {
    this.#availablePath();
    const movableSet = new Set(this.knightPath.map(([r, c]) => `${r},${c}`));

    if (movableSet.has(`${toRow},${toCol}`)) {
      this.#move(this.row, this.col, toRow, toCol);
    }

    return this.show();
  }
}
