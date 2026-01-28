import { Button } from "@mui/material";

export function ResetBtn({ onReset }) {
  return (
    <Button
      onClick={onReset || (() => window.location.reload())}
      style={{
        padding: "10px 20px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        background: "#007bff",
        color: "white",
      }}
    >
      Reset Game
    </Button>
  );
}
