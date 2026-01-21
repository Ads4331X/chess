import React from "react";

const ChessKnightFilledIcon = ({
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
        d="m8.959 1.99l-.147.028l-.115.029a1 1 0 0 0-.646 1.27L8.8 5.562L5.985 7.297a2 2 0 0 0-.655 2.751l.089.133A2 2 0 0 0 7.033 11l1.563-.001l-1.614 4.674A1 1 0 0 0 7.927 17h7.961a1 1 0 0 0 1-.978l.112-5c0-3.827-1.555-6.878-4.67-7.966l-2.399-.83l-.375-.121l-.258-.074L9.163 2l-.101-.013l-.055-.001zM18 18H6a1 1 0 0 0-1 1a2 2 0 0 0 2 2h10a2 2 0 0 0 1.987-1.768l.011-.174A1 1 0 0 0 18 18"
      />
    </svg>
  );
};

export default ChessKnightFilledIcon;
