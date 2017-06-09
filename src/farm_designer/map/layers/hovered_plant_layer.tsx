import * as React from "react";
import { TaggedPlantPointer } from "../../../resources/tagged_resources";
import { DesignerState, BotOriginQuadrant } from "../../interfaces";
import {
  calculateXBasedOnQuadrant,
  calculateYBasedOnQuadrant,
  round
} from "../util";
import { push } from "../../../history";

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

interface HoveredPlantLayerProps {
  currentPlant: TaggedPlantPointer | undefined;
  designer: DesignerState;
  botOriginQuadrant: BotOriginQuadrant;
  hoveredPlant: TaggedPlantPointer | undefined;
  dispatch: Function;
  isEditing: boolean;
}

interface HoveredPlantLayerState { isHovered: boolean; }

export class HoveredPlantLayer extends
  React.Component<HoveredPlantLayerProps, Partial<HoveredPlantLayerState>> {

  state: HoveredPlantLayerState = { isHovered: false }

  onClick = () => {
    let plant = this.props.hoveredPlant;
    if (plant) {
      push("/app/designer/plants/" + (plant.body.id));
      let action = { type: "SELECT_PLANT", payload: plant.uuid };
      this.props.dispatch(action);
    }
  }

  toggle = (bool: keyof HoveredPlantLayerState) => () =>
    this.setState({ isHovered: !this.state.isHovered })

  /** Safe fallbacks if no hovered plant is found. */
  get plantInfo() {
    if (this.props.hoveredPlant) {
      let { x, y, radius } = this.props.hoveredPlant.body;
      return { x, y, radius };
    } else {
      return { x: 0, y: 0, radius: 1 };
    }
  }
  render() {
    let { icon } = this.props.designer.hoveredPlant;
    let { botOriginQuadrant } = this.props;

    let newX = calculateXBasedOnQuadrant({
      value: round(this.plantInfo.x),
      quadrant: botOriginQuadrant
    });
    let newY = calculateYBasedOnQuadrant({
      value: round(this.plantInfo.y),
      quadrant: botOriginQuadrant
    });

    let scaleFactor = (this.state.isHovered) ? "1.3, 1.3" : "1, 1";

    return <image
      hidden={this.props.isEditing}
      style={{ transform: "scale(" + scaleFactor + ")" }}
      className={"hovered-plant-copy"}
      x={newX - (this.plantInfo.radius)}
      y={newY - (this.plantInfo.radius)}
      onMouseEnter={this.toggle("isHovered")}
      onMouseLeave={this.toggle("isHovered")}
      onClick={this.onClick}
      width={this.plantInfo.radius * 2}
      height={this.plantInfo.radius * 2}
      href={icon}
    />
  }
}
