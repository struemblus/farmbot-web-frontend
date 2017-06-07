import * as React from "react";
import { TaggedPlantPointer } from "../../../resources/tagged_resources";
import { round, scale } from "../util";
import { BotOriginQuadrant } from "../../interfaces";

interface SpreadLayerProps {
  visible: boolean;
  plants: TaggedPlantPointer[];
  currentPlant: TaggedPlantPointer | undefined;
  botOriginQuadrant: BotOriginQuadrant;
}

export function SpreadLayer(props: SpreadLayerProps) {
  let { plants, visible, currentPlant } = props;

  return <g>
    {
      plants.map((p, index) => {
        let isSelected = p === currentPlant;
        return (visible || isSelected) ?
          <SpreadCircle plant={p} key={index} /> : <g key={index} />;
      })
    }
  </g>
}

interface SpreadCircleProps {
  plant: TaggedPlantPointer;
}

export function SpreadCircle({ plant }: SpreadCircleProps) {
  let { radius, x, y, spread } = plant.body;
  return <circle
    cx={round(x)}
    cy={round(y)}
    r={scale(spread || radius)}
    fillOpacity={0.2}
    fill={"green"}
    stroke={"green"}
    strokeWidth={"1.5"} />;
}
