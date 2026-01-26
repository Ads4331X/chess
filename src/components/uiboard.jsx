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
import { Queen } from "../logic/queen";
import { Bishiop } from "../logic/bishop";
import Rook from "../logic/rook";
import Knight from "../logic/knight";

import Modal from "@mui/material/Modal";

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

  const timeLimit = 0.1 * 60; // 5 minutes in seconds
  const [whiteRemaining, setWhiteRemaining] = useState(timeLimit);
  const [blackRemaining, setBlackRemaining] = useState(timeLimit);
  const [currentTurn, setCurrentTurn] = useState(
    gameBoard.board.__board__.turn,
  );
  const [isRunning, setIsRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [promotionUI, setPromotionUI] = useState(null);
  const [checkStatus, setCheckStatus] = useState("");

  let promotionColor = currentTurn === "w" ? "white" : "black";

  // Check for check/checkmate after each move
  useEffect(() => {
    if (gameBoard.board.__board__.isCheckmate(currentTurn)) {
      setCheckStatus("CHECKMATE!");
      setGameOver(true);
    } else if (gameBoard.board.__board__.isInCheck(currentTurn)) {
      setCheckStatus("CHECK");
    } else {
      setCheckStatus("");
    }
  }, [currentTurn, gameBoard]);

  // Stop the game when time runs out
  useEffect(() => {
    if (whiteRemaining <= 0 || blackRemaining <= 0) {
      setGameOver(true);
    }
  }, [whiteRemaining, blackRemaining]);

  // Tick timer every second
  useEffect(() => {
    if (!isRunning || gameOver) return;

    const timer = setInterval(() => {
      if (currentTurn === "w") {
        setWhiteRemaining((prev) => Math.max(prev - 1, 0));
      } else {
        setBlackRemaining((prev) => Math.max(prev - 1, 0));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn, isRunning, gameOver]);

  useEffect(() => {
    setPromotionUI(gameBoard.board.__board__.pendingPromotion);
  }, [gameBoard.board.__board__.pendingPromotion]);

  const handleSquareClick = (r, c) => {
    if (promotionUI) return;

    const clickedPiece = gameBoard.board[r][c];

    if (!selectedPiece) {
      if (!clickedPiece) return;
      if (!gameBoard.board.__board__.isTurn(clickedPiece.color)) return;

      setSelectedPiece(clickedPiece);

      // Filter out illegal moves that would leave king in check
      const allPaths = clickedPiece.show();
      const legalPaths = allPaths.filter(([toRow, toCol]) =>
        gameBoard.board.__board__.isLegalMove(
          clickedPiece,
          clickedPiece.row,
          clickedPiece.col,
          toRow,
          toCol,
        ),
      );

      setMovablePath(legalPaths);
      return;
    }

    if (clickedPiece && clickedPiece.color === selectedPiece.color) {
      setSelectedPiece(clickedPiece);

      // Filter out illegal moves that would leave king in check
      const allPaths = clickedPiece.show();
      const legalPaths = allPaths.filter(([toRow, toCol]) =>
        gameBoard.board.__board__.isLegalMove(
          clickedPiece,
          clickedPiece.row,
          clickedPiece.col,
          toRow,
          toCol,
        ),
      );

      setMovablePath(legalPaths);
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
    <Box
      sx={{
        display: "grid",
        position: "relative",
      }}
    >
      {/* Promotion UI */}
      {promotionUI && (
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          {[
            <ChessQueenIcon key="queen" color={promotionColor} />,
            <ChessRookFilledIcon key="rook" color={promotionColor} />,
            <ChessBishopFilledIcon key="bishop" color={promotionColor} />,
            <ChessKnightFilledIcon key="knight" color={promotionColor} />,
          ].map((p, index) => (
            <Button
              key={index}
              sx={{
                margin: 1,
                backgroundColor: "red",
                minWidth: 60,
                minHeight: 60,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => {
                const { row, col } = promotionUI;
                const pieces = [Queen, Rook, Bishiop, Knight];
                gameBoard.board.__board__.promotePawn(row, col, pieces[index]);

                setCurrentTurn(gameBoard.board.__board__.turn);
                setPromotionUI(null);
              }}
            >
              {p}
            </Button>
          ))}
        </Box>
      )}

      {/* Black Timer */}
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
          <Box sx={{ padding: 1 }}>Black:</Box>
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

      {/* Chess Board */}
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

      {/* White Timer */}
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
          <Box sx={{ padding: 1 }}>white:</Box>
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

      {/* Turn Display */}
      <Box
        sx={{
          fontWeight: "bold",
          fontSize: "18px",
          marginBottom: 2,
          background: "gray",
          padding: 1,
          textAlign: "center",
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

      {/* Check/Checkmate Status Display */}
      {checkStatus && (
        <Box
          sx={{
            fontSize: "32px",
            fontWeight: "bold",
            color: checkStatus === "CHECKMATE!" ? "#ff0000" : "#ff6600",
            textAlign: "center",
            padding: 2,
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            animation: checkStatus === "CHECK" ? "pulse 1s infinite" : "none",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.7 },
            },
          }}
        >
          {checkStatus}
        </Box>
      )}

      {/* Game Over Display */}
      {gameOver && !checkStatus && (
        <Modal
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={gameOver}
        >
          <Box
            sx={{
              fontSize: "32px",
              fontWeight: "bold",
              color: "#ff0000",
              textAlign: "center",

              padding: 2,
              background: "rgba(255, 255, 255, 0.9)",
              borderRadius: 2,
              boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            }}
          >
            TIME OUT! {whiteRemaining <= 0 ? "Black" : "White"} Wins!
          </Box>
        </Modal>
      )}
    </Box>
  );
}
