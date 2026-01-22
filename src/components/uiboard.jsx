import { Box, Button, colors } from "@mui/material";
import { Square } from "./square";

import { Pieces } from "../logic/pieces";
import { Board } from "../logic/board";
import Pawn from "../logic/pawn";
import Rook from "../logic/rook";
import Knight from "../logic/knight";
import { Queen } from "../logic/queen";
import { Bishiop } from "../logic/bishop";

import WPawnIcon from "../assets/w-pawn";
import { useState } from "react";
import ChessRookFilledIcon from "../assets/rook";
import ChessKnightFilledIcon from "../assets/knight";
import ChessBishopFilledIcon from "../assets/bishiop";
import ChessQueenIcon from "../assets/queen";
import ChessKingFilledIcon from "../assets/king";

const blackColor = "#343434ff";
const whiteColor = "#BDBDBD";
const icons = {
  bP: (props) => <WPawnIcon {...props} color={blackColor} />,
  wP: (props) => <WPawnIcon {...props} color={whiteColor} />,
  bR: (props) => <ChessRookFilledIcon {...props} color={blackColor} />,
  wR: (props) => <ChessRookFilledIcon {...props} color={whiteColor} />,
  wH: (props) => <ChessKnightFilledIcon {...props} color={whiteColor} />,
  bH: (props) => <ChessKnightFilledIcon {...props} color={blackColor} />,
  wB: (props) => <ChessBishopFilledIcon {...props} color={whiteColor} />,
  bB: (props) => <ChessBishopFilledIcon {...props} color={blackColor} />,
  bQ: (props) => <ChessQueenIcon {...props} color={blackColor} />,
  wQ: (props) => <ChessQueenIcon {...props} color={whiteColor} />,
  wK: (props) => <ChessKingFilledIcon {...props} color={whiteColor} />,
  bK: (props) => <ChessKingFilledIcon {...props} color={blackColor} />,
};

export default function UIBoard() {
  const [gameBoard] = useState(new Board()); // makes board
  const [movablePaths, setMovablePath] = useState([]); // for  movable path
  const [selectedPiece, setSelectedPiece] = useState(null); // for selected piece

  return (
    <Box
      sx={{
        display: "grid",
      }}
    >
      {/** looping in the board grid 8x8 */}
      {gameBoard.board.map((rows, r) => {
        return (
          <Box
            key={r}
            sx={{
              display: "flex",
            }}
          >
            {" "}
            {rows.map((i, c) => {
              let Icon;

              if (typeof i === "string") {
                Icon = icons[i];
              } else if (i !== null) {
                Icon = icons[i.name];
              }
              return (
                <Button
                  key={`${r},${c}`}
                  sx={{
                    border: 0,
                    padding: 0,
                    margin: 0,
                    backgroundColor: (c + r) % 2 === 0 ? "#EEEED2" : "#769656",
                  }}
                  onClick={() => {
                    const clickedPiece = gameBoard.board[r][c];

                    // No piece selected yet
                    if (!selectedPiece) {
                      if (!clickedPiece) return; // clicked empty square → do nothing
                      if (!gameBoard.board.__board__.isTurn(clickedPiece.color))
                        return; // wrong turn

                      setSelectedPiece(clickedPiece);
                      setMovablePath(clickedPiece.show());
                      return;
                    }

                    // Piece already selected
                    if (
                      clickedPiece &&
                      clickedPiece.color === selectedPiece.color
                    ) {
                      // reselect piece
                      setSelectedPiece(clickedPiece);
                      setMovablePath(clickedPiece.show());
                      return;
                    }

                    selectedPiece.move(r, c); // move the selected piece

                    setSelectedPiece(null);
                    setMovablePath(null);
                  }}
                >
                  {/** display the square component with childrens */}
                  <Square>
                    {Icon && <Icon size={100} />}
                    {movablePaths &&
                    movablePaths.some(
                      ([row, col]) => row === r && col === c,
                    ) ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectedPiece.move(r, c); // move the piece
                          setMovablePath([]); // set the movable path to empty array
                          setSelectedPiece(null); // set the selected piece to null
                        }}
                      >
                        {/** for displaying a golden dot on the movable path */}
                        <Box
                          sx={{
                            position: "relative",
                            top: "40%",
                            left: "40%",
                            fontWeight: "bold",
                            width: "15px",
                            height: "15px",
                            borderRadius: "100%",
                            backgroundColor: "goldenrod",
                            zIndex: 100,
                          }}
                        ></Box>
                      </Box>
                    ) : null}
                  </Square>
                </Button>
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
}
