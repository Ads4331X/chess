import React from "react";

const ChessBishopFilledIcon = ({
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
        d="M12 2a2 2 0 0 1 1.386 3.442q.969.42 1.74 1.017l-3.833 3.834l-.083.094a1 1 0 0 0 1.403 1.403l.094-.083l3.814-3.813C17.498 9.244 18 10.964 18 13c0 1.913-1.178 3.722-3.089 3.973l-.2.02L14.5 17h-5C7.374 17 6 15.076 6 13c0-3.68 1.57-6.255 4.613-7.56A2 2 0 0 1 12 2m0 3v1m6 12H6a1 1 0 0 0-1 1a2 2 0 0 0 2 2h10a2 2 0 0 0 1.987-1.768l.011-.174A1 1 0 0 0 18 18"
      />
    </svg>
  );
};

export default ChessBishopFilledIcon;
