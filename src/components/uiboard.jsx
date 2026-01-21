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
  const [gameBoard] = useState(new Board());
  const [movablePaths, setMovablePath] = useState([]);

  return (
    <Box
      sx={{
        display: "grid",
      }}
    >
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
                // console.log(i);
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
                    // gameBoard.onClick(i);
                    i !== null ? setMovablePath(i.show()) : null;
                  }}
                >
                  <Square>
                    {Icon && <Icon size={100} />}
                    {movablePaths.some(
                      ([row, col]) => row === r && col === c,
                    ) ? (
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                        }}
                        onClick={() => {
                          console.log(i);
                          i.move();
                        }}
                      >
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
