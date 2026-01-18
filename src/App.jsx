import { Pieces } from "./logic/pieces";
import { Board } from "./logic/board";
import Pawn from "./logic/pawn";
import Rook from "./logic/rook";
import "./App.css";

function App() {
  const gameBoard = new Board();
  const pieces = new Pieces("both", gameBoard);
  let wiitePawn = new Pawn("pawn", "white", 6, 0, gameBoard);
  let blackPawn = new Pawn("pawn", "black", 1, 1, gameBoard);
  let LwhiteRook = new Rook("white", 7, 0, gameBoard);
  pieces.initialize();
  wiitePawn.movePawn(5, 0);
  wiitePawn.movePawn(4, 0);
  blackPawn.movePawn(3, 1);
  wiitePawn.movePawn(3, 1);
  console.log(gameBoard.Display());
  LwhiteRook.moveRook(4, 0);
  LwhiteRook.moveRook(4, 7);
  console.log(LwhiteRook.show());

  return <></>;
}

export default App;
