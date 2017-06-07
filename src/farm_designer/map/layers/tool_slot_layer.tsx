import * as React from "react";
import { SlotWithTool } from "../../../resources/interfaces";
import { ToolSlotPoint } from "../tool_slot_point";
import { BotOriginQuadrant } from "../../interfaces";

interface ToolSlotLayerProps {
  visible: boolean;
  slots: SlotWithTool[];
  botOriginQuadrant: BotOriginQuadrant;
}

export function ToolSlotLayer({ slots, visible }: ToolSlotLayerProps) {
  return visible ? <g>
    {slots.map(slot =>
      <ToolSlotPoint key={slot.toolSlot.uuid} slot={slot} />
    )}}
      </g> : <g />; // fallback
}
