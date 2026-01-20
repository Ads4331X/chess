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
  let pawn = new Pawn("pawn", "w", 6, 3, gameBoard);
  let p = new Pawn("pawn", "w", 6, 1, gameBoard);
  let p1 = new Pawn("pawn", "b", 1, 0, gameBoard);

  let wiitePawn = new Pawn("pawn", "w", 6, 0, gameBoard);
  let blackPawn = new Pawn("pawn", "b", 1, 1, gameBoard);
  let LwhiteRook = new Rook("w", 7, 0, gameBoard);
  let bKnight = new Knight("b", 0, 1, gameBoard);
  let wQueen = new Queen("w", 7, 3, gameBoard);
  pieces.initialize();
  wiitePawn.show();
  p.movePawn(4, 1);
  p1.movePawn(2, 0);
  pawn.movePawn(4, 3);
  p1.movePawn(3, 0);
  wiitePawn.movePawn(5, 0);
  blackPawn.movePawn(3, 1);
  wQueen.moveQueen(6, 3);
  console.log(gameBoard.Display());
  bKnight.moveKnight(2, 2);
  LwhiteRook.moveRook(4, 0);

  return <></>;
}

export default App;
