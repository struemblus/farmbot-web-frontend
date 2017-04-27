import * as React from "react";

interface RadiusCircleProps {
  x: number;
  y: number;
  r: number;
  /** Should it be shown or not? */
  selected: boolean;
}

export function SpreadCircle({ x, y, r, selected }: RadiusCircleProps) {
  return <circle
    className={"plant-indicator is-chosen-" + !!selected}
    cx={x}
    cy={y}
    r={selected ? r : 0}
    stroke="green"
    strokeWidth={selected ? 4 : 0}
    strokeDasharray={selected ? 8 : 0}
    fill="none" />;
}
