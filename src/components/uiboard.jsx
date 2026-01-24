import { Box, Button } from "@mui/material";
import { Square } from "./square";
import { Board } from "../logic/board";
import WPawnIcon from "../assets/w-pawn";
import { useState, useEffect } from "react";
import ChessRookFilledIcon from "../assets/rook";
import ChessKnightFilledIcon from "../assets/knight";
import ChessBishopFilledIcon from "../assets/bishiop";
import ChessQueenIcon from "../assets/queen";
import ChessKingFilledIcon from "../assets/king";
import dayjs from "dayjs";

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
  const [selectedPiece, setSelectedPiece] = useState(null);

  const timeLimit = 5 * 60; // 5 minutes in seconds
  const [whiteRemaining, setWhiteRemaining] = useState(timeLimit);
  const [blackRemaining, setBlackRemaining] = useState(timeLimit);
  const [currentTurn, setCurrentTurn] = useState(
    gameBoard.board.__board__.turn,
  );
  const [isRunning, setIsRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // to stop the game when its over
  useEffect(() => {
    if (whiteRemaining <= 0 || blackRemaining <= 0) setGameOver(true);
  }, [whiteRemaining, blackRemaining]);

  // Tick timer every second
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (currentTurn === "w") {
        setWhiteRemaining((prev) => Math.max(prev - 1, 0));
      } else {
        setBlackRemaining((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn, isRunning]);

  const handleSquareClick = (r, c) => {
    const clickedPiece = gameBoard.board[r][c];

    if (!selectedPiece) {
      if (!clickedPiece) return;
      if (!gameBoard.board.__board__.isTurn(clickedPiece.color)) return;

      setSelectedPiece(clickedPiece);
      setMovablePath(clickedPiece.show());
      return;
    }

    if (clickedPiece && clickedPiece.color === selectedPiece.color) {
      setSelectedPiece(clickedPiece);
      setMovablePath(clickedPiece.show());
      return;
    }

    // Move piece
    selectedPiece.move(r, c);

    // Pause briefly
    setIsRunning(false);

    setSelectedPiece(null);
    setMovablePath([]);

    // Switch turn
    const nextTurn = gameBoard.board.__board__.turn;
    setCurrentTurn(nextTurn);

    // Resume timer for next player
    setIsRunning(true);
  };

  const formatTime = (seconds) =>
    dayjs().startOf("day").second(seconds).format("mm:ss");

  return (
    <Box sx={{ display: "grid" }}>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          display: "flex",
          justifyContent: "end",
          margin: 0,
        }}
      >
        <Box
          sx={{
            background: "red",
            padding: 2,
            borderRadius: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              padding: 1,
            }}
          >
            {" "}
            Black:{" "}
          </Box>
          <Box
            sx={{
              background: "gray",
              padding: 1,
              borderRadius: 1,
            }}
          >
            {formatTime(blackRemaining)}
          </Box>
        </Box>
      </Box>
      {gameBoard.board.map((rows, r) => (
        <Box key={r} sx={{ display: "flex" }}>
          {rows.map((i, c) => {
            let Icon = null;
            if (typeof i === "string") Icon = icons[i];
            else if (i) Icon = icons[i.name];

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
                onClick={() => handleSquareClick(r, c)}
              >
                <Square>
                  {Icon && <Icon size={100} />}
                  {movablePaths?.some(
                    ([row, col]) => row === r && col === c,
                  ) && (
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
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          display: "flex",
          justifyContent: "start",
          margin: 0,
        }}
      >
        <Box
          sx={{
            background: "red",
            padding: 2,
            borderRadius: 1,
            display: "flex",
          }}
        >
          {" "}
          <Box
            sx={{
              padding: 1,
            }}
          >
            {" "}
            white:{" "}
          </Box>
          <Box
            sx={{
              background: "gray",
              padding: 1,
              borderRadius: 1,
            }}
          >
            {formatTime(whiteRemaining)}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: 2,
          background: "gray",
        }}
      >
        Turn:{" "}
        <span
          style={{
            color: currentTurn === "w" ? "white" : "black",
          }}
        >
          {currentTurn === "w" ? "White" : "Black"}
        </span>
      </Box>
    </Box>
  );
}
