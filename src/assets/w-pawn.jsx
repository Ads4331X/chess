import React from "react";

const WPawnIcon = ({
  size = 50,
  color = "#000000",
  strokeWidth = 0,
  background = "transparent",
  opacity = 1,
  rotation = 0,
  shadow = 1,
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
          shadow > 0 ? `drop-shadow(0 1px 2px rgba(0, 0, 0, 1))` : undefined,

        backgroundColor: background !== "transparent" ? background : undefined,
      }}
    >
      <path
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3a3 3 0 0 1 3 3c0 1.113-.6 2.482-1.5 3l1.5 7H9l1.5-7C9.6 8.482 9 7.113 9 6a3 3 0 0 1 3-3M8 9h8m-9.316 7.772a1 1 0 0 0-.684.949V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1.28a1 1 0 0 0-.684-.948L15 16H9z"
      />
    </svg>
  );
};

export default WPawnIcon;
