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
    this.hasMoved = false;
  }

  #isValid(pos) {
    return pos >= 0 && pos <= 7;
  }

  #canCastle(rookCol) {
    // King must not have moved
    if (this.hasMoved) return false;

    // Can't castle out of check
    if (this.board.__board__.isInCheck(this.color)) return false;

    // Check rook exists and hasn't moved
    const rook = this.board[this.row][rookCol];
    if (!rook || rook.type !== "rook" || rook.hasMoved) return false;

    const direction = rookCol > this.col ? 1 : -1;
    const enemy = this.color === "w" ? "b" : "w";

    // Check squares between king and rook are empty
    for (let c = this.col + direction; c !== rookCol; c += direction) {
      if (this.board[this.row][c] !== null) return false;
    }

    // King can't pass through or land on attacked squares
    const kingDestCol = this.col + direction * 2;
    for (let c = this.col; c !== kingDestCol + direction; c += direction) {
      if (this.board.__board__.isSquareAttacked(this.row, c, enemy)) {
        return false;
      }
    }

    return true;
  }

  #availablePaths() {
    this.kingPath = [];
    const moves = [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    // Normal king moves
    for (const [rOff, cOff] of moves) {
      const r = this.row + rOff;
      const c = this.col + cOff;
      if (!this.#isValid(r) || !this.#isValid(c)) continue;
      const sq = this.board[r][c];
      if (!sq || sq.color !== this.color) {
        this.kingPath.push([r, c]);
      }
    }

    // Add castling moves
    if (this.#canCastle(7)) {
      // Kingside (right)
      this.kingPath.push([this.row, this.col + 2]);
    }
    if (this.#canCastle(0)) {
      // Queenside (left)
      this.kingPath.push([this.row, this.col - 2]);
    }

    this.#legalMoves();
  }

  #legalMoves() {
    const enemy = this.color === "w" ? "b" : "w";
    this.legalMoves = this.kingPath.filter(([r, c]) => {
      // Castling moves are already validated in #canCastle
      if (Math.abs(c - this.col) === 2) return true;

      // Normal moves: check if square is attacked
      return !this.board.__board__.isSquareAttacked(r, c, enemy);
    });
  }

  getAttackSquares() {
    // King attacks all adjacent squares (not including castling)
    const attacks = [];
    const moves = [
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 0],
      [-1, 1],
    ];

    for (const [rOff, cOff] of moves) {
      const r = this.row + rOff;
      const c = this.col + cOff;
      if (this.#isValid(r) && this.#isValid(c)) {
        attacks.push([r, c]);
      }
    }
    return attacks;
  }

  show() {
    this.#availablePaths();
    return this.legalMoves;
  }

  #move(fromRow, fromCol, toRow, toCol) {
    if (!this.board.__board__.isTurn(this.color)) return false;

    const target = this.board[toRow][toCol];

    // Check if this is a castling move
    const isCastling = Math.abs(toCol - fromCol) === 2;

    if (isCastling) {
      // Move the rook
      if (toCol > fromCol) {
        // Kingside castling
        const rook = this.board[this.row][7];
        this.board[this.row][5] = rook;
        this.board[this.row][7] = null;
        rook.col = 5;
        rook.hasMoved = true;
      } else {
        // Queenside castling
        const rook = this.board[this.row][0];
        this.board[this.row][3] = rook;
        this.board[this.row][0] = null;
        rook.col = 3;
        rook.hasMoved = true;
      }
      this.board.__board__.playMoveSound();
    } else {
      // Normal move or capture
      if (target) this.board.__board__.playCaptureSound();
      else this.board.__board__.playMoveSound();
    }

    // Move the king
    const king = this.board[fromRow][fromCol];
    this.board[toRow][toCol] = king;
    this.board[fromRow][fromCol] = null;
    this.row = toRow;
    this.col = toCol;
    this.hasMoved = true;

    this.board.__board__.afterMove();
  }

  move(toRow, toCol) {
    this.#availablePaths();
    const movableSet = new Set(
      this.legalMoves.map(([row, col]) => `${row},${col}`),
    );

    if (movableSet.has(`${toRow},${toCol}`)) {
      this.#move(this.row, this.col, toRow, toCol);
    }

    return this.show();
  }
}
