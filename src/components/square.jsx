import Box from "@mui/material/Box";

export function Square({ sx, children }) {
  return (
    <Box
      sx={{
        width: 100,
        height: 100,
        borderRadius: 0,
        ...sx,
      }}
    >
      {" "}
      {children}
    </Box>
  );
}
