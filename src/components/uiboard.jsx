import { Box } from "@mui/material";
import { Board } from "../logic/board";
import { useState, useEffect } from "react";
import Timer from "./timer";
import Promotion from "./promotion";
import Status from "./status";
import ChessBoard from "./chessBoard";

export default function UIBoard() {
  const timeLimit = 5 * 60; // 5 minutes in seconds

  // Initialize state
  const [gameBoard, setGameBoard] = useState(new Board());
  const [movablePaths, setMovablePath] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [whiteRemaining, setWhiteRemaining] = useState(timeLimit);
  const [blackRemaining, setBlackRemaining] = useState(timeLimit);
  const [currentTurn, setCurrentTurn] = useState("w");
  const [isRunning, setIsRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [promotionUI, setPromotionUI] = useState(null);
  const [checkStatus, setCheckStatus] = useState("");

  // FIXED: Reset function creates a NEW board instance
  const handleReset = () => {
    const newBoard = new Board();
    setGameBoard(newBoard);
    setCurrentTurn("w");
    setWhiteRemaining(timeLimit);
    setBlackRemaining(timeLimit);
    setGameOver(false);
    setCheckStatus("");
    setSelectedPiece(null);
    setMovablePath([]);
    setPromotionUI(null);
    setIsRunning(true);
  };

  // Check for check/checkmate/stalemate after each move
  useEffect(() => {
    if (gameBoard.board.__board__.isCheckmate(currentTurn)) {
      setCheckStatus("CHECKMATE!");
      setGameOver(true);
    } else if (gameBoard.board.__board__.isStalemate(currentTurn)) {
      setCheckStatus("STALEMATE!");
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

  // Watch for pawn promotion
  useEffect(() => {
    setPromotionUI(gameBoard.board.__board__.pendingPromotion);
  }, [gameBoard.board.__board__.pendingPromotion]);

  const handleSquareClick = (r, c) => {
    if (promotionUI) return;

    const clickedPiece = gameBoard.board[r][c];

    // Select a piece
    if (!selectedPiece) {
      if (!clickedPiece) return;
      if (!gameBoard.board.__board__.isTurn(clickedPiece.color)) return;

      setSelectedPiece(clickedPiece);
      setMovablePath(getLegalMoves(clickedPiece));
      return;
    }

    // Switch selected piece
    if (clickedPiece && clickedPiece.color === selectedPiece.color) {
      setSelectedPiece(clickedPiece);
      setMovablePath(getLegalMoves(clickedPiece));
      return;
    }

    // Move the selected piece
    selectedPiece.move(r, c);
    setIsRunning(false);
    setSelectedPiece(null);
    setMovablePath([]);
    setCurrentTurn(gameBoard.board.__board__.turn);
    setIsRunning(true);
  };

  const getLegalMoves = (piece) => {
    const allPaths = piece.show();
    return allPaths.filter(([toRow, toCol]) =>
      gameBoard.board.__board__.isLegalMove(
        piece,
        piece.row,
        piece.col,
        toRow,
        toCol,
      ),
    );
  };

  const handlePromotion = () => {
    setCurrentTurn(gameBoard.board.__board__.turn);
    setPromotionUI(null);
  };

  return (
    <Box
      sx={{
        display: "grid",
        position: "relative",
      }}
    >
      <Promotion
        promotionUI={promotionUI}
        gameBoard={gameBoard}
        onPromote={handlePromotion}
      />

      <Timer label="Black" timeRemaining={blackRemaining} />

      <ChessBoard
        board={gameBoard.board}
        movablePaths={movablePaths}
        gameOver={gameOver}
        onSquareClick={handleSquareClick}
      />

      <Timer label="White" timeRemaining={whiteRemaining} />

      <Status
        currentTurn={currentTurn}
        checkStatus={checkStatus}
        gameOver={gameOver}
        whiteRemaining={whiteRemaining}
        blackRemaining={blackRemaining}
        onReset={handleReset}
      />
    </Box>
  );
}
