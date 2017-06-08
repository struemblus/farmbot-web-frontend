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
  dispatch: Function;
  isEditing: boolean;
}

interface HoveredPlantLayerState { isHovered: boolean; }

export class HoveredPlantLayer extends
  React.Component<HoveredPlantLayerProps, Partial<HoveredPlantLayerState>> {

  state: HoveredPlantLayerState = { isHovered: false }

  onClick = () => {
    let { plant } = this.props.designer.hoveredPlant;
    push("/app/designer/plants/" + (plant && plant.body.id));
    let action = { type: "SELECT_PLANT", payload: plant && plant.uuid };
    this.props.dispatch(action);
  }

  toggle = (bool: keyof HoveredPlantLayerState) => () =>
    this.setState({ isHovered: !this.state.isHovered })

  render() {
    let { plant, icon } = this.props.designer.hoveredPlant;
    let { botOriginQuadrant } = this.props;

    let x = plant && plant.body.x || 0;
    let y = plant && plant.body.y || 0;

    let newX = calculateXBasedOnQuadrant({
      value: round(x),
      quadrant: botOriginQuadrant
    });
    let newY = calculateYBasedOnQuadrant({
      value: round(y),
      quadrant: botOriginQuadrant
    });

    let scaleFactor = (this.state.isHovered) ? "1.3, 1.3" : "1, 1";

    return <image
      hidden={this.props.isEditing}
      style={{ transform: "scale(" + scaleFactor + ")" }}
      className={"hovered-plant-copy"}
      x={newX - (plant && plant.body.radius || 1)}
      y={newY - (plant && plant.body.radius || 1)}
      onMouseEnter={this.toggle("isHovered")}
      onMouseLeave={this.toggle("isHovered")}
      onClick={this.onClick}
      width={plant && plant.body.radius * 2}
      height={plant && plant.body.radius * 2}
      href={icon}
    />
  }
}
