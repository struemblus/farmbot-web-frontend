import * as React from "react";
import { TaggedPlantPointer } from "../../../resources/tagged_resources";
import { round, scale } from "../util";

interface SpreadLayerProps {
  visible: boolean;
  plants: TaggedPlantPointer[];
  currentPlant: TaggedPlantPointer | undefined;
}

export function SpreadLayer(props: SpreadLayerProps) {
  let { plants, visible, currentPlant } = props;

  return <g> {
    plants.map(function (p, index) {
      let isSelected = p === currentPlant;
      return (visible || isSelected) ?
        <SpreadCircle plant={p} key={index} /> : <g key={index} />;
    })
  }</g>

}

interface SpreadCircleProps {
  plant: TaggedPlantPointer;
}

export function SpreadCircle({ plant }: SpreadCircleProps) {
  let { radius, x, y } = plant.body;
  return <circle
    cx={round(x + radius)}
    cy={round(y + radius)}
    r={scale(radius)}
    fillOpacity={0.2}
    fill={"green"}
    stroke={"green"}
    strokeWidth={"1.5"} />;
}
