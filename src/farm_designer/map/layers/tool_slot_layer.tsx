import * as React from "react";
import { SlotWithTool } from "../../../resources/interfaces";
import { ToolSlotPoint } from "../tool_slot_point";

interface ToolSlotLayerProps {
  visible: boolean;
  slots: SlotWithTool[];
}
export function ToolSlotLayer(props: ToolSlotLayerProps) {
  let { slots, visible } = props;
  if (visible) {
    return <g>{
      slots.map(slot => <ToolSlotPoint slot={slot} key={slot.toolSlot.uuid} />)}
      }</g>;
  } else {
    return <g />;
  }
}
