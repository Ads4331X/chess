import Box from "@mui/material/Box";

export function Square({ children }) {
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        borderRadius: 0,
      }}
    >
      {" "}
      {children}
    </Box>
  );
}
