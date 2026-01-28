import { Box, Modal } from "@mui/material";
import { ResetBtn } from "./ResetBtn";

export default function Status({
  currentTurn,
  checkStatus,
  gameOver,
  whiteRemaining,
  blackRemaining,
  onReset,
}) {
  return (
    <>
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

      {/* Check Status  */}
      {checkStatus === "CHECK" && (
        <Box
          sx={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#ff6600",
            textAlign: "center",
            padding: 2,
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
            animation: "pulse 1s infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 1 },
              "50%": { opacity: 0.7 },
            },
          }}
        >
          CHECK
        </Box>
      )}

      {/* Game Over - Time Out */}
      {gameOver && !checkStatus && (
        <Modal
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={gameOver}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
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
            <ResetBtn onReset={onReset} />
          </Box>
        </Modal>
      )}

      {/* Game Over - Checkmate */}
      {checkStatus === "CHECKMATE!" && (
        <Modal
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={true}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
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
              CHECKMATE! {currentTurn === "w" ? "Black" : "White"} Wins!
            </Box>
            <ResetBtn onReset={onReset} />
          </Box>
        </Modal>
      )}

      {/* Game Over - Stalemate */}
      {checkStatus === "STALEMATE!" && (
        <Modal
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
          open={true}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                fontSize: "32px",
                fontWeight: "bold",
                color: "#ffa500",
                textAlign: "center",
                padding: 2,
                background: "rgba(255, 255, 255, 0.9)",
                borderRadius: 2,
                boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
              }}
            >
              STALEMATE! It's a Draw!
            </Box>
            <ResetBtn onReset={onReset} />
          </Box>
        </Modal>
      )}
    </>
  );
}
