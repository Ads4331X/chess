import { Box, Button } from "@mui/material";
import ChessRookFilledIcon from "../assets/rook";
import ChessKnightFilledIcon from "../assets/knight";
import ChessBishopFilledIcon from "../assets/bishiop";
import ChessQueenIcon from "../assets/queen";
import { Queen } from "../logic/queen";
import { Bishiop } from "../logic/bishop";
import Rook from "../logic/rook";
import Knight from "../logic/knight";

export default function Promotion({ promotionUI, gameBoard, onPromote }) {
  if (!promotionUI) return null;

  const promotionColor = promotionUI.color === "w" ? "white" : "black";
  const pieces = [Queen, Rook, Bishiop, Knight];
  const icons = [
    <ChessQueenIcon key="queen" color={promotionColor} />,
    <ChessRookFilledIcon key="rook" color={promotionColor} />,
    <ChessBishopFilledIcon key="bishop" color={promotionColor} />,
    <ChessKnightFilledIcon key="knight" color={promotionColor} />,
  ];

  const handlePromotion = (index) => {
    const { row, col } = promotionUI;
    gameBoard.board.__board__.promotePawn(row, col, pieces[index]);
    onPromote();
  };

  return (
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
      {icons.map((icon, index) => (
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
          onClick={() => handlePromotion(index)}
        >
          {icon}
        </Button>
      ))}
    </Box>
  );
}
