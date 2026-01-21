import React from "react";

const ChessKingFilledIcon = ({
  size = undefined,
  color = "#000000",
  strokeWidth = 0,
  background = "transparent",
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0,
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push("scaleX(-1)");
  if (flipVertical) transforms.push("scaleY(-1)");

  const viewBoxSize = 24 + padding * 2;
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        opacity,
        transform: transforms.join(" ") || undefined,
        filter:
          shadow > 0
            ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))`
            : undefined,
        backgroundColor: background !== "transparent" ? background : undefined,
      }}
    >
      <path
        fill={color}
        d="M12 2a1 1 0 0 1 .993.883L13 3v2h2a1 1 0 0 1 .117 1.993L15 7h-2v1.758a4.5 4.5 0 0 1 2.033-.734l.24-.018L15.5 8a4.5 4.5 0 0 1 4.5 4.5a4.504 4.504 0 0 1-4.064 4.478l-.217.016L15.5 17h-7a4.5 4.5 0 1 1 2.501-8.241L11 7H9a1 1 0 0 1-.117-1.993L9 5h2V3a1 1 0 0 1 1-1m6 16H6a1 1 0 0 0-1 1a2 2 0 0 0 2 2h10a2 2 0 0 0 1.987-1.768l.011-.174A1 1 0 0 0 18 18"
      />
    </svg>
  );
};

export default ChessKingFilledIcon;
