import { Pieces } from "./logic/pieces";
import { Board } from "./logic/board";
import Pawn from "./logic/pawn";
import Rook from "./logic/rook";
import Knight from "./logic/knight";
import { Bishiop } from "./logic/bishop";
import "./App.css";
import { Queen } from "./logic/queen";

function App() {
  const gameBoard = new Board();
  const pieces = new Pieces("both", gameBoard);
  let pawn = new Pawn("pawn", "white", 6, 3, gameBoard);
  let p = new Pawn("pawn", "white", 6, 1, gameBoard);
  let p1 = new Pawn("pawn", "black", 1, 0, gameBoard);

  let wiitePawn = new Pawn("pawn", "white", 6, 0, gameBoard);
  let blackPawn = new Pawn("pawn", "black", 1, 1, gameBoard);
  let LwhiteRook = new Rook("white", 7, 0, gameBoard);
  let wKnight = new Knight("white", 7, 1, gameBoard);
  let bKnight = new Knight("black", 0, 1, gameBoard);
  let wBishiop = new Bishiop("white", 7, 2, gameBoard);
  let wQueen = new Queen("white", 7, 3, gameBoard);
  pieces.initialize();
  wiitePawn.show();
  p.movePawn(4, 1);
  pawn.movePawn(4, 3);
  p1.movePawn(2, 0);
  p1.movePawn(3, 0);
  wiitePawn.movePawn(5, 0);
  wiitePawn.movePawn(4, 0);
  blackPawn.movePawn(3, 1);
  wiitePawn.movePawn(3, 1);
  console.log(gameBoard.Display());
  LwhiteRook.moveRook(4, 0);
  LwhiteRook.moveRook(4, 7);
  bKnight.moveKnight(2, 2);
  wKnight.moveKnight(5, 0);
  wBishiop.moveBishiop(6, 1);
  wQueen.moveQueen(6, 3);
  wQueen.moveQueen(3, 6);
  wQueen.moveQueen(1, 6);

  return <></>;
}

export default App;
