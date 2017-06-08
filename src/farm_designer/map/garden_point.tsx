import * as React from "react";
import { GardenPointProps } from "../interfaces";
import { defensiveClone } from "../../util";
import { calculateXBasedOnQuadrant, calculateYBasedOnQuadrant } from "./util";

const POINT_STYLES = {
  stroke: "green",
  strokeOpacity: 0.3,
  strokeWidth: "2",
  fill: "none",
};

export function GardenPoint(props: GardenPointProps) {
  let { point, quadrant } = props;
  let styles = defensiveClone(POINT_STYLES);
  styles.stroke = point.body.meta.color || "green";
  return <g>
    <circle
      cx={calculateXBasedOnQuadrant({ value: point.body.x, quadrant })}
      cy={calculateYBasedOnQuadrant({ value: point.body.y, quadrant })}
      r={point.body.radius}
      {...styles} />
    <circle
      cx={calculateXBasedOnQuadrant({ value: point.body.x, quadrant })}
      cy={calculateYBasedOnQuadrant({ value: point.body.y, quadrant })}
      r={2}
      {...styles} />
  </g>;
}
