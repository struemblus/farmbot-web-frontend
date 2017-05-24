import * as React from "react";
import { SlotWithTool } from "../../resources/interfaces";

interface TSPProps {
  slot: SlotWithTool;
}

interface TSPState {
  hovered: boolean;
}

export class ToolSlotPoint extends React.Component<TSPProps, Partial<TSPState>> {
  get slot() { return this.props.slot; }

  state: TSPState = {
    hovered: false
  };

  render() {
    return <g>
      <circle key={this.slot.toolSlot.uuid}
        onMouseOver={() => this.setState({ hovered: true })}
        onMouseLeave={() => this.setState({ hovered: false })}
        cx={this.slot.toolSlot.body.x}
        cy={this.slot.toolSlot.body.y}
        r={30}
        fillOpacity={0.2}
        fill={this.state.hovered ? "red" : "gray"}
        stroke="black"
        strokeWidth="1.5" />
      <text
        hidden={!this.state.hovered}
        x={this.slot.toolSlot.body.x}
        y={this.slot.toolSlot.body.y}
        fontSize={24}>
        {this.slot.tool ? this.slot.tool.body.name : "No tool"}
      </text>
    </g>
  }
}
