import { Bishiop } from "./bishop";
import { Board } from "./board";
import { King } from "./king";
import Knight from "./knight";

import Pawn from "./pawn";
import { Queen } from "./queen";
import Rook from "./rook";
/**
 * the coordinates of the pieces with their respective names
 */
const initializePlaces = {
  whitePawns: [
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 7],
  ],
  blackPawns: [
    [1, 0],
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
  ],
  whiteRooks: [
    [7, 0],
    [7, 7],
  ],
  blackRooks: [
    [0, 0],
    [0, 7],
  ],
  whiteKnights: [
    [7, 1],
    [7, 6],
  ],
  blackKnights: [
    [0, 1],
    [0, 6],
  ],

  whiteBishops: [
    [7, 2],
    [7, 5],
  ],
  blackBishops: [
    [0, 2],
    [0, 5],
  ],
  whiteQueens: [[7, 3]],
  blackQueens: [[0, 3]],
  whiteKings: [[7, 4]],
  blackKings: [[0, 4]],
};

export class Pieces {
  /** initialize white pawns on the board in their initial position */
  #initializeWhitePawns() {
    initializePlaces.whitePawns.forEach((wP) => {
      // add white pawns to the board
      let firstCood = wP[0];
      let secondCood = wP[1];
      const pawn = new Pawn(
        "pawn",
        "w",
        firstCood,
        secondCood,
        this.board,
        "wP",
      );

      this.board[firstCood][secondCood] = pawn;
    });
  }

  /**initialize black pawns on the board in thier initial position */
  #initializeBlackPawns() {
    initializePlaces.blackPawns.forEach((bP) => {
      // add black pawns to the board
      let firstCood = bP[0];
      let secondCood = bP[1];
      this.board[firstCood][secondCood] = "bP";
      const pawn = new Pawn(
        "pawn",
        "b",
        firstCood,
        secondCood,
        this.board,
        "bP",
      );
      this.board[firstCood][secondCood] = pawn;
    });
  }

  #initializeBlackKnights() {
    initializePlaces.blackKnights.forEach((bH) => {
      // add black Knights to the board
      let firstCood = bH[0];
      let secondCood = bH[1];
      const knight = new Knight("b", firstCood, secondCood, this.board, "bH");
      this.board[firstCood][secondCood] = knight;
    });
  }
  /** initialize white knights to the board in thier initial position */
  #initializeWhiteKnights() {
    initializePlaces.whiteKnights.forEach((wH) => {
      // add white Knights to the board
      let firstCood = wH[0];
      let secondCood = wH[1];
      const knight = new Knight("w", firstCood, secondCood, this.board, "wH");
      this.board[firstCood][secondCood] = knight;
    });
  }
  /** initialize white rooks to to board in their initial position */
  #initializeWhiteRooks() {
    initializePlaces.whiteRooks.forEach((wR) => {
      // add white rooks to the board
      let firstCood = wR[0];
      let secondCood = wR[1];

      const rook = new Rook("w", firstCood, secondCood, this.board, "wR");
      this.board[firstCood][secondCood] = rook;
    });
  }
  /** initialize black rooks to the board in their initial position */
  #initializeBlackRooks() {
    initializePlaces.blackRooks.forEach((bR) => {
      // add white rooks to the board
      let firstCood = bR[0];
      let secondCood = bR[1];
      const rook = new Rook("b", firstCood, secondCood, this.board, "bR");
      this.board[firstCood][secondCood] = rook;
    });
  }
  /** initialize white bishiops to the board in their initial position */
  #initializewhiteBishops() {
    initializePlaces.whiteBishops.forEach((wB) => {
      // add white bishiop to the board
      let firstCood = wB[0];
      let secondCood = wB[1];
      const bishiop = new Bishiop("w", firstCood, secondCood, this.board, "wB");
      this.board[firstCood][secondCood] = bishiop;
    });
  }
  /** initialize black bishiops to the board in their initial position */
  #initializeBlackBishops() {
    initializePlaces.blackBishops.forEach((bB) => {
      // add black bishiop to the board
      let firstCood = bB[0];
      let secondCood = bB[1];
      const bishiop = new Bishiop("b", firstCood, secondCood, this.board, "bB");
      this.board[firstCood][secondCood] = bishiop;
    });
  }
  /** initialize black queen to the board in their initial position */
  #initializeBlackQueens() {
    initializePlaces.blackQueens.forEach((bQ) => {
      // add black queen to the board
      let firstCood = bQ[0];
      let secondCood = bQ[1];
      const queen = new Queen("b", firstCood, secondCood, this.board, "bQ");
      this.board[firstCood][secondCood] = queen;
    });
  }

  /** initialize white queen to the board in their initial position */
  #initializeWhiteQueens() {
    initializePlaces.whiteQueens.forEach((wQ) => {
      // add white queen to the board
      let firstCood = wQ[0];
      let secondCood = wQ[1];
      const queen = new Queen("w", firstCood, secondCood, this.board, "wQ");
      this.board[firstCood][secondCood] = queen;
    });
  }
  /** initialize black king to the board in their initial position */
  #initializeBlackKings() {
    initializePlaces.blackKings.forEach((bK) => {
      // add black king to the board
      let firstCood = bK[0];
      let secondCood = bK[1];
      const king = new King("b", firstCood, secondCood, this.board, "bK");
      this.board[firstCood][secondCood] = king;
    });
  }
  /** initialize white king to the board in their initial position */
  #initializeWhiteKings() {
    initializePlaces.whiteKings.forEach((wK) => {
      // add white king to the board
      let firstCood = wK[0];
      let secondCood = wK[1];
      const king = new King("w", firstCood, secondCood, this.board, "wK");
      this.board[firstCood][secondCood] = king;
    });
  }

  /**
   * initialize Pieces to the board
   * @return {Board.board} the board by initializing the pieces in the beginning
   */
  #initializePieces() {
    this.#initializeWhitePawns();
    this.#initializeBlackPawns();
    this.#initializeBlackKnights();
    this.#initializeWhiteKnights();
    this.#initializeWhiteRooks();
    this.#initializeBlackRooks();
    this.#initializewhiteBishops();
    this.#initializeBlackBishops();
    this.#initializeBlackQueens();
    this.#initializeWhiteQueens();
    this.#initializeWhiteKings();
    this.#initializeBlackKings();

    return this.board;
  }

  constructor(color, board = null) {
    this.board = board || new Board();
    this.color = color;
  }

  initialize() {
    this.#initializePieces();
  }
}
