import { ReactNode } from "react";

type ProgressRingProps = {
  value?: number;
  stroke?: number;
  color?: string;
  children: ReactNode;
};

export const ProgressRing = ({
  value = 50,
  stroke = 8,
  color = "#58CC02",
  children,
}: ProgressRingProps) => {
  const svgW = 98;
  const svgH = 93;

  const cx = svgW / 2;
  const cy = svgH / 2;

  const rx = cx - stroke / 2;
  const ry = cy - stroke / 2;

  const h = Math.pow(rx - ry, 2) / Math.pow(rx + ry, 2);

  const perimeter =
    Math.PI * (rx + ry) * (1 + (3 * h) / (10 + Math.sqrt(4 - 3 * h)));

  const offset = perimeter - (value / 100) * perimeter;

  const trackPath = `M ${cx} ${cy - ry} A ${rx} ${ry} 0 0 1 ${cx} ${cy + ry} A ${rx} ${ry} 0 0 1 ${cx} ${cy - ry}`;

  return (
    <div className="relative w-[98px] h-[93px]">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${svgW} ${svgH}`}
        className="absolute inset-0 pointer-events-none overflow-visible"
      >
        <path d={trackPath} fill="none" stroke="#E5E5E5" strokeWidth={stroke} />

        <path
          d={trackPath}
          fill="none"
          stroke={color}
          strokeWidth={stroke - 0.5}
          strokeDasharray={perimeter}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};
