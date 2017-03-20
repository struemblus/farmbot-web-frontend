import * as Axios from "axios";
import { t } from "i18next";
import { Thunk, ReduxAction } from "../redux/interfaces";
import { API } from "../api";
import { ToolBay, ToolSlot, Tool } from "./interfaces";
import { success, error } from "../ui";
import { prettyPrintApiErrors } from "../util";
import { selectAll } from "../resources/util";
import { create, destroy } from "../api/crud";

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

export function saveToolBay(
  id: number, toolBays: ToolBay[], callback: Function
): Thunk {
  return (dispatch, getState) => {
    let tool_slots = selectAll(getState().resources.tool_slots);
    let url = API.current.toolSlotsPath;
    Axios.post<ToolSlot[]>(url, { tool_slots })
      .then(resp => {
        success(t("ToolBay saved."));
        callback();
        resp.data.map(function (toolSlot) {
          dispatch(saveToolSlotOk(toolSlot));
        });
      }, (e: Error) => {
        error(prettyPrintApiErrors(e));
      });
  };
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

export function addSlot(slot: Partial<ToolSlot>, toolBayId: number): Thunk {
  slot.tool_bay_id = toolBayId;
  return create({
    kind: "tool_slots",
    body: (slot as ToolSlot)
  });
}

export function destroySlot(id: number): Thunk {
  return (dispatch, getState) => {
    Axios
      .delete<ToolSlot>(API.current.toolSlotsPath + id)
      .then(resp => {
        dispatch(destroyToolSlotOk(id));
        success("Successfully deleted tool slot.", "Success");
      }, (e: Error) => {
        error(prettyPrintApiErrors(e));
      });
  };
}

export function saveToolsOk(tools: Tool[]): ReduxAction<{}> {
  return { type: "SAVE_TOOLS_OK", payload: tools };
}

export function updateTool(id: number, value: string): ReduxAction<{}> {
  return { type: "UPDATE_TOOL", payload: { id, value } };
}

export function saveTools(tools: Tool[]): Thunk {
  return (dispatch, getState) => {

    function finish() {
      success(t("Tools saved."));
      dispatch(toggleEditingTools());
    }

    let dirtyTools = tools.filter(allTools => !!allTools.dirty);
    // Return early if API call not required.
    if (!dirtyTools.length) { return finish(); }

    Axios.post<Tool[]>(API.current.toolsPath, { tools: dirtyTools })
      .then(resp => {
        finish();
        dispatch(saveToolsOk(resp.data));
      }, (e: Error) => {
        error(prettyPrintApiErrors(e));
      });
  };
}

export function destroyTool(body: Tool): Thunk {
  return destroy({ kind: "tools", body })
}

export function addTool(name: string): Thunk {
  return create({
    kind: "tools",
    body: { name }
  });
}

