import { Pieces } from "./pieces";

export class Board {
  constructor() {
    this.representRow = ["a", "b", "c", "d", "e", "f", "g", "h"]; // representation
    this.representCol = ["8", "7", "6", "5", "4", "3", "2", "1"];
    this.initializeBoard();
    this.lastMove = null;
    this.turn = "w";
    this.pendingPromotion = null;
  }

  initializeBoard() {
    this.board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));
    const pieces = new Pieces("both", this.board);
    pieces.initialize();
    this.board.__board__ = this;
  }

  isSquareAttacked(x, y, byColor) {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (!piece || piece.color !== byColor) continue;
        if (typeof piece.getAttackSquares !== "function") continue;
        for (let [ar, ac] of piece.getAttackSquares()) {
          if (ar === x && ac === y) return true;
        }
      }
    }
    return false;
  }

  recordMove(piece, fromRow, fromCol, toRow, toCol) {
    if (piece.type === "pawn") {
      this.lastMove = {
        pieceType: "pawn",
        color: piece.color,
        fromRow,
        fromCol,
        toRow,
        toCol,
        wasDoubleStep: Math.abs(fromRow - toRow) === 2,
      };
    } else {
      this.lastMove = { pieceType: "other" };
    }
  }

  switchTurn() {
    this.turn = this.turn === "w" ? "b" : "w";
  }
  isTurn(color) {
    return this.turn === color;
  }
  Display() {
    return this.board;
  }

  isCheckmate(color) {
    if (!this.isInCheck(color)) return false;

    // Try all possible moves for this color
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (!piece || piece.color !== color) continue;

        const moves = piece.show();
        for (let [toR, toC] of moves) {
          // Test if this move gets out of check
          if (this.isLegalMove(piece, r, c, toR, toC)) {
            return false; // Found a legal move, not checkmate
          }
        }
      }
    }

    return true; // No legal moves found
  }

  isInCheck(color) {
    // Find the king
    let kingRow, kingCol;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const piece = this.board[r][c];
        if (piece && piece.type === "king" && piece.color === color) {
          kingRow = r;
          kingCol = c;
          break;
        }
      }
    }

    const enemyColor = color === "w" ? "b" : "w";
    return this.isSquareAttacked(kingRow, kingCol, enemyColor);
  }

  isLegalMove(piece, fromRow, fromCol, toRow, toCol) {
    const captured = this.board[toRow][toCol];

    // make move
    this.board[fromRow][fromCol] = null;
    this.board[toRow][toCol] = piece;
    piece.row = toRow;
    piece.col = toCol;

    // find king
    let kingRow, kingCol;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        const p = this.board[r][c];
        if (p && p.type === "king" && p.color === piece.color) {
          kingRow = r;
          kingCol = c;
        }
      }
    }

    const enemy = piece.color === "w" ? "b" : "w";
    const illegal = this.isSquareAttacked(kingRow, kingCol, enemy);

    // undo move
    this.board[fromRow][fromCol] = piece;
    this.board[toRow][toCol] = captured;
    piece.row = fromRow;
    piece.col = fromCol;

    return !illegal;
  }

  promotePawn(row, col, PieceClass) {
    const pawn = this.board[row][col]; // Get the pawn that's currently on the promotion square

    if (!pawn || pawn.type !== "pawn") {
      console.error("No pawn found for promotion at", row, col);
      return;
    }

    const color = pawn.color;
    const pieceKey = color + PieceClass.name[0].toUpperCase();

    // Replace the pawn with the new piece
    this.board[row][col] = new PieceClass(
      color,
      row,
      col,
      this.board,
      pieceKey,
    );

    this.pendingPromotion = null;
    this.switchTurn();
  }
}
