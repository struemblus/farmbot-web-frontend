import * as React from "react";
import { TaggedPlantPointer } from "../../../resources/tagged_resources";
import { DesignerState } from "../../interfaces";

/**
 * PROBLEM: The plants are rendered via svg in a certain order. When a user
 * hovers over part of a plant they'd like to select that was rendered *prior*
 * to a different plant, it will cause an overlap and a less-than-desirable ux.
 *
 * SOLUTION: Use props to tell this component what plant is currently being
 * hovered over and make a "copy" to display on top of the rest of the layers.
 *
 * NOTE: This layer MUST be rendered LAST in its parent component to properly
 * achieve this effect.
 */

interface SelectedPlantLayerProps {
  currentPlant: TaggedPlantPointer | undefined;
  designer: DesignerState;
}

export function SelectedPlantLayer(props: SelectedPlantLayerProps) {
  let { plant, icon } = props.designer.hoveredPlant;
  return <image
    hidden={true} // Temp stub
    x={plant && plant.body.x}
    y={plant && plant.body.y}
    width={plant && plant.body.radius * 2}
    height={plant && plant.body.radius * 2}
    href={icon}
  />
}
