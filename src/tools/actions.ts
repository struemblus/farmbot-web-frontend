import { ReduxAction } from "../redux/interfaces";
import { ToolBay, ToolSlot, Tool } from "./interfaces";
import { destroy, save } from "../api/crud";

/** Generic */
export function toggleEditingToolBays(): ReduxAction<{}> {
  return { type: "TOGGLE_EDIT_TOOL_BAYS", payload: {} };
}

export function toggleEditingTools(): ReduxAction<{}> {
  return { type: "TOGGLE_EDIT_TOOLS", payload: {} };
}

/** ToolBays */
export function saveToolBayOk(toolBay: ToolBay): ReduxAction<{}> {
  return { type: "SAVE_TOOL_BAY_OK", payload: toolBay };
}

export function saveToolBay(uuid: string) {
  save(uuid);
}

/** ToolSlots */
export function updateSlot(id: number, name: string, value: number | undefined):
  ReduxAction<{}> {
  return { type: "UPDATE_TOOL_SLOT", payload: { id, name, value } };
}

export function detachTool(tool_slot_id: number) {
  return {
    type: "DETACH_TOOL",
    payload: tool_slot_id
  };
}

export function saveToolSlotOk(toolSlot: ToolSlot): ReduxAction<{}> {
  return { type: "SAVE_TOOL_SLOTS_OK", payload: toolSlot };
}

export function updateToolSlotOk(toolSlot: ToolSlot): ReduxAction<{}> {
  return { type: "UPDATE_TOOL_SLOT_OK", payload: toolSlot };
}

export function destroyToolSlotOk(id: number): ReduxAction<{}> {
  return { type: "DESTROY_TOOL_SLOT_OK", payload: { id } };
}

export function addSlot(uuid: string) {
  return save(uuid);
}

export function destroySlot(uuid: string) {
  destroy(uuid);
}

export function saveToolsOk(tools: Tool[]): ReduxAction<{}> {
  return { type: "SAVE_TOOLS_OK", payload: tools };
}

export function updateTool(id: number, value: string): ReduxAction<{}> {
  return { type: "UPDATE_TOOL", payload: { id, value } };
}

export function saveTools(uuid: string) {
  save(uuid);
}

export function destroyTool(uuid: string) {
  return destroy(uuid)
}

export function addTool(uuid: string) {
  return save(uuid);
}
