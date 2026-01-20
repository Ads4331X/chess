import { Pieces } from "./logic/pieces";
import { Board } from "./logic/board";
import Pawn from "./logic/pawn";
import Rook from "./logic/rook";
import Knight from "./logic/knight";
import "./App.css";

function App() {
  const gameBoard = new Board();
  const pieces = new Pieces("both", gameBoard);
  let wiitePawn = new Pawn("pawn", "white", 6, 0, gameBoard);
  let blackPawn = new Pawn("pawn", "black", 1, 1, gameBoard);
  let LwhiteRook = new Rook("white", 7, 0, gameBoard);
  let wKnight = new Knight("white", 7, 1, gameBoard);
  let bKnight = new Knight("black", 0, 1, gameBoard);
  pieces.initialize();
  wiitePawn.movePawn(5, 0);
  wiitePawn.movePawn(4, 0);
  blackPawn.movePawn(3, 1);
  wiitePawn.movePawn(3, 1);
  console.log(gameBoard.Display());
  LwhiteRook.moveRook(4, 0);
  LwhiteRook.moveRook(4, 7);
  bKnight.moveKnight(2, 2);
  wKnight.moveKnight(5, 0);

  return <></>;
}

export default App;
