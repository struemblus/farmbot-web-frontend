import * as React from "react";
import { SlotWithTool } from "../../resources/interfaces";
import { calculateXBasedOnQuadrant, calculateYBasedOnQuadrant } from "./util";
import { BotOriginQuadrant } from "../interfaces";

interface TSPProps {
  slot: SlotWithTool;
  quadrant: BotOriginQuadrant;
}

interface TSPState {
  hovered: boolean;
}

export class ToolSlotPoint extends
  React.Component<TSPProps, Partial<TSPState>> {

  state: TSPState = {
    hovered: false
  };

  get slot() { return this.props.slot; }

  render() {
    let { x, y, name } = this.slot.toolSlot.body;
    let { quadrant } = this.props;
    return <g>
      <circle key={this.slot.toolSlot.uuid}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        cx={calculateXBasedOnQuadrant({ value: x, quadrant })}
        cy={calculateYBasedOnQuadrant({ value: y, quadrant })}
        r={35}
        fillOpacity={0.5}
        fill={this.state.hovered ? "#434343" : "#666666"} />
      <text
        hidden={!this.state.hovered}
        x={calculateXBasedOnQuadrant({ value: x, quadrant })}
        y={calculateYBasedOnQuadrant({ value: y, quadrant })}
        dx={40}
        dy={10}
        fontSize={24}
        fill={"#434343"}>
        {this.slot.tool ? name : "no tool"}
      </text>
    </g>
  }
}
