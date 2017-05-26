import * as React from "react";
import { SlotWithTool } from "../../resources/interfaces";

interface TSPProps {
  slot: SlotWithTool;
}

interface TSPState {
  hovered: boolean;
}

export class ToolSlotPoint
  extends React.Component<TSPProps, Partial<TSPState>> {

  state: TSPState = {
    hovered: false
  };

  get slot() { return this.props.slot; }

  render() {
    return <g>
      <circle key={this.slot.toolSlot.uuid}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        cx={this.slot.toolSlot.body.x}
        cy={this.slot.toolSlot.body.y}
        r={35}
        fillOpacity={0.5}
        fill={this.state.hovered ? "#434343" : "#666666"} />
      <text
        hidden={!this.state.hovered}
        x={this.slot.toolSlot.body.x}
        y={this.slot.toolSlot.body.y}
        dx={40}
        dy={10}
        fontSize={24}
        fill={"#434343"}>
        {this.slot.tool ? this.slot.tool.body.name : "No tool"}
      </text>
    </g>
  }
}
