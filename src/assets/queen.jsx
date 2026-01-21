import React from "react";

const ChessQueenIcon = ({
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
      <g
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m16 16l2-11l-4 4l-2-5l-2 5l-4-4l2 11m0 0l-1.447.724a1 1 0 0 0-.553.894V20h12v-2.382a1 1 0 0 0-.553-.894L16 16z" />
        <path d="M11 4a1 1 0 1 0 2 0a1 1 0 1 0-2 0M5 5a1 1 0 1 0 2 0a1 1 0 1 0-2 0m12 0a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
      </g>
    </svg>
  );
};

export default ChessQueenIcon;
