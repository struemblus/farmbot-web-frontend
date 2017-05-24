import * as React from "react";
import { SlotWithTool } from "../../../resources/interfaces";

interface ToolSlotLayerProps {
  visible: boolean;
  slots: SlotWithTool[];
}
export function ToolSlotLayer(props: ToolSlotLayerProps) {
  let { slots, visible } = props;
  if (visible) {
    return <g>{slots.map(function (slot) {
      return <circle key={slot.toolSlot.uuid} cx={slot.toolSlot.body.x}
        cy={slot.toolSlot.body.y}
        r={30}
        fill="gray" />
    })}</g>;
  } else {
    return <g />;
  }
}
