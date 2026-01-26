import { Box, Button } from "@mui/material";
import { Square } from "./square";
import WPawnIcon from "../assets/w-pawn";
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

export default function ChessBoard({
  board,
  movablePaths,
  gameOver,
  onSquareClick,
}) {
  return (
    <>
      {board.map((rows, r) => (
        <Box key={r} sx={{ display: "flex" }}>
          {rows.map((piece, c) => {
            let Icon = null;
            if (typeof piece === "string") Icon = icons[piece];
            else if (piece) Icon = icons[piece.name];

            const isMovablePath = movablePaths?.some(
              ([row, col]) => row === r && col === c,
            );

            return (
              <Button
                disabled={gameOver}
                key={`${r},${c}`}
                sx={{
                  border: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: (c + r) % 2 === 0 ? "#EEEED2" : "#769656",
                }}
                onClick={() => onSquareClick(r, c)}
              >
                <Square>
                  {Icon && <Icon size={100} />}
                  {isMovablePath && (
                    <Box
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
                    >
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
                          transform: "translate(-50%, -50%)",
                        }}
                      />
                    </Box>
                  )}
                </Square>
              </Button>
            );
          })}
        </Box>
      ))}
    </>
  );
}
