import * as Axios from "axios";
import { t } from "i18next";
import { Thunk, ReduxAction } from "../redux/interfaces";
import { API } from "../api";
import {
  ToolBay,
  ToolSlot,
  Tool,
  ErrorPayl
} from "./interfaces";
import { success, error } from "../ui";
import * as _ from "lodash";
import { prettyPrintApiErrors, AxiosErrorResponse } from "../util";

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

export function saveToolBay(id: number, toolBays: ToolBay[]): Thunk {
  let bay = _.findWhere(toolBays, { id });
  return (dispatch, getState) => {
    Axios
      .patch<ToolBay>(API.current.toolBaysPath + id, bay)
      .then(resp => {
        dispatch(saveToolBayOk(resp.data));
      }, (e: Error) => {
        error(t(`ToolBay could not be updated: ${e.message}`));
      });
  };
}

/** ToolSlots */
export function updateToolSlot(id: number, name: string, value: number):
  ReduxAction<{}> {
  return { type: "UPDATE_TOOL_SLOT", payload: { id, name, value } };
}

export function addToolSlotOk(toolSlot: ToolSlot): ReduxAction<{}> {
  return { type: "ADD_TOOL_SLOT_OK", payload: toolSlot };
}

export function addToolSlotNo(error: AxiosErrorResponse): ErrorPayl {
  return { type: "ADD_TOOL_SLOT_NO", payload: error };
}

export function saveToolSlotOk(toolSlot: ToolSlot): ReduxAction<{}> {
  return { type: "SAVE_TOOL_SLOTS_OK", payload: toolSlot };
}

export function updateToolSlotOk(toolSlot: ToolSlot): ReduxAction<{}> {
  return { type: "UPDATE_TOOL_SLOT_OK", payload: toolSlot };
}

export function updateToolSlotNo(error: AxiosErrorResponse): ErrorPayl {
  return { type: "UPDATE_TOOL_SLOT_NO", payload: error };
}

export function destroyToolSlotOk(id: number): ReduxAction<{}> {
  return { type: "DESTROY_TOOL_SLOT_OK", payload: { id } };
}

export function destroyToolSlotNo(error: AxiosErrorResponse): ErrorPayl {
  return { type: "DESTROY_TOOL_SLOT_NO", payload: error };
}

export function addToolSlot(slot: ToolSlot, tool_bay_id: number): Thunk {
  let { x, y, z, tool_id } = slot;
  let data = { x, y, z, tool_id, tool_bay_id };

  return (dispatch, getState) => {
    Axios
      .post<ToolSlot>(API.current.toolSlotsPath, data)
      .then(resp => {
        dispatch(addToolSlotOk(resp.data));
      }, (e: Error) => {
        dispatch(addToolSlotNo(e));
        error(prettyPrintApiErrors(e));
      });
  };
}

export function saveToolSlots(tool_slots: ToolSlot[]): Thunk {
  return (dispatch, getState) => {
    let dirtSlots = {
      tool_slots: tool_slots.filter(allSlots => !!allSlots.dirty)
    };
    let url = API.current.toolSlotsPath;
    Axios.post<ToolSlot[]>(url, dirtSlots)
      .then(resp => {
        success(t("ToolBay saved."));
        dispatch(saveToolSlotOk(resp.data));
      }, (e: Error) => {
        error(prettyPrintApiErrors(e));
      });
  };
}

export function destroySlot(id: number): Thunk {
  return (dispatch, getState) => {
    Axios
      .delete<ToolSlot>(API.current.toolSlotsPath + id)
      .then(resp => {
        dispatch(destroyToolSlotOk(id));
      }, (e: Error) => {
        dispatch(destroyToolSlotNo(e));
        error(prettyPrintApiErrors(e));
      });
  };
}

/** Tools */
export function saveToolsOk(tools: Tool[]): ReduxAction<{}> {
  return { type: "SAVE_TOOLS_OK", payload: tools };
}

export function saveToolNo(error: AxiosErrorResponse): ErrorPayl {
  return { type: "SAVE_TOOLS_NO", payload: error };
}

function addTool(name: string) {
  return Axios.post<Tool>(API.current.toolsPath, { name });
}

function updateTool(id: number) {
  return Axios.put<Tool>(API.current.toolsPath + id);
}

function destroyTool(id: number) {
  return Axios.delete<Tool>(API.current.toolsPath + id);
}

export function saveAllTools(tools: Tool[]): Thunk {
  return (dispatch, getState) => {

    /** Add Tools */
    let addedTools = tools.filter(allTools => !!allTools.isNew);
    let addPromises = addedTools.map(function (addedTool) {
      if (!addedTools.length) { return; }
      return addTool(addedTool.name);
    });

    /** Update Tools */
    let updatedTools = tools.filter(allTools => !!allTools.dirty);
    let updatePromises = updatedTools.map(function (updatedTool) {
      if (!updatedTools.length) { return; }
      if (updatedTool.id) { return updateTool(updatedTool.id); }
    });

    /** Destroy Tools */
    let deletedTools = tools.filter(allTools => !!allTools.isDeleted);
    let deletePromises = deletedTools.map(function (deletedTool) {
      if (!deletedTools.length) { return; }
      if (deletedTool.id) { return destroyTool(deletedTool.id); }
    });

    /** Send off */
    Promise.all([addPromises, updatePromises, deletePromises])
      .then(resp => {
        success("Tools have been updated.", "Success");
        dispatch(saveToolsOk(tools));
      })
      .catch((e: Error) => {
        error(prettyPrintApiErrors(e));
      });
  };
};

