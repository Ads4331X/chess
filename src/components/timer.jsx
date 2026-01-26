import { Box } from "@mui/material";
import dayjs from "dayjs";

export default function Timer({ label, timeRemaining, color }) {
  const formatTime = (seconds) =>
    dayjs().startOf("day").second(seconds).format("mm:ss");

  return (
    <Box
      sx={{
        fontWeight: "bold",
        fontSize: "18px",
        display: "flex",
        justifyContent: label === "Black" ? "end" : "start",
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
        <Box sx={{ padding: 1 }}>{label}:</Box>
        <Box
          sx={{
            background: "gray",
            padding: 1,
            borderRadius: 1,
          }}
        >
          {formatTime(timeRemaining)}
        </Box>
      </Box>
    </Box>
  );
}
