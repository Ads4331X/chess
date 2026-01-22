import { Box, Button } from "@mui/material";
import { Square } from "./square";

import { Board } from "../logic/board";

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
                        // darkens the square of the movable path
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          backgroundColor: "rgba(0,0,0,0.15)",
                          zIndex: 5,
                          pointerEvents: "none",
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
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            backgroundColor: "orange",
                            zIndex: 10,
                            pointerEvents: "none",
                            transform: "translate(-50%, -50%)", // perfectly centers
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
