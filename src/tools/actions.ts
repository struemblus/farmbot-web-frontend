import * as axios from "axios";
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
export function startEditingToolBays(): ReduxAction<{}> {
    return { type: "EDIT_TOOL_BAYS_START", payload: {} };
}

export function stopEditingToolBays(): ReduxAction<{}> {
    return { type: "EDIT_TOOL_BAYS_STOP", payload: {} };
}

export function startEditingTools(): ReduxAction<{}> {
    return { type: "EDIT_TOOLS_START", payload: {} };
}

export function stopEditingTools(): ReduxAction<{}> {
    return { type: "EDIT_TOOLS_STOP", payload: {} };
}

/** ToolBays */
export function saveToolBayNo(toolBays: AxiosErrorResponse): ErrorPayl {
    return { type: "SAVE_TOOL_BAY_NO", payload: error };
}

export function saveToolBayOk(toolBay: ToolBay): ReduxAction<{}> {
    return { type: "SAVE_TOOL_BAY_OK", payload: toolBay };
}

export function updateToolBay(id: number, value: string): ReduxAction<{}> {
    return { type: "UPDATE_TOOL_BAY", payload: { id, value } };
}

export function saveToolBay(id: number, toolBays: ToolBay[]): Thunk {
    let bay = _.findWhere(toolBays, { id });
    return (dispatch, getState) => {
        axios
            .patch<ToolBay>(API.current.toolBaysPath + id, bay)
            .then(resp => {
                dispatch(saveToolBayOk(resp.data));
                success(t("ToolBay successfully updated."));
            }, (e: Error) => {
                dispatch(saveToolBayNo(e));
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

export function saveToolSlotNo(error: AxiosErrorResponse): ErrorPayl {
    return { type: "SAVE_TOOL_SLOT_NO", payload: error };
}

export function updateToolSlotOk(toolSlot: ToolSlot): ReduxAction<{}> {
    return { type: "UPDATE_TOOL_SLOT_OK", payload: toolSlot };
}

export function updateToolSlotNo(error: AxiosErrorResponse): ErrorPayl {
    return { type: "UPDATE_TOOL_SLOT_NO", payload: error };
}

export function destroyToolSlotOk(id: number): ReduxAction<{}> {
    return { type: "DESTROY_TOOL_SLOT_OK", payload: id };
}

export function destroyToolSlotNo(error: AxiosErrorResponse): ErrorPayl {
    return { type: "DESTROY_TOOL_SLOT_NO", payload: error };
}

export function addToolSlot(slot: ToolSlot, tool_bay_id: number): Thunk {
    let { x, y, z, tool_id } = slot;
    let data = { x, y, z, tool_id, tool_bay_id };
    return (dispatch, getState) => {
        axios
            .post<ToolSlot>(API.current.toolSlotsPath, data)
            .then(resp => {
                dispatch(addToolSlotOk(resp.data));
                success(t("ToolSlot added."));
            }, (e: Error) => {
                dispatch(addToolSlotNo(e));
                error(prettyPrintApiErrors(e));
            });
    };
}

export function saveToolSlots(toolSlots: ToolSlot[]): Thunk {
    return (dispatch, getState) => {
        toolSlots.filter(allSlots => !!allSlots.dirty).map(dirtySlot => {
            let url = API.current.toolSlotsPath + dirtySlot.id;
            axios
                .put<ToolSlot>(url, dirtySlot)
                .then(resp => {
                    dispatch(saveToolSlotOk(resp.data));
                    success(t("ToolBay saved."));
                }, (e: Error) => {
                    dispatch(saveToolSlotNo(e));
                    error(prettyPrintApiErrors(e));
                });
        });
    };
}

export function destroySlot(id: number): Thunk {
    return (dispatch, getState) => {
        axios
            .delete<ToolSlot>(API.current.toolSlotsPath + id)
            .then(resp => {
                dispatch(destroyToolSlotOk(id));
                success(t("ToolSlot deleted."));
            }, (e: Error) => {
                dispatch(destroyToolSlotNo(e));
                error(prettyPrintApiErrors(e));
            });
    };
}

/** Tools */
export function updateTool(id: number, value: string): ReduxAction<{}> {
    return { type: "UPDATE_TOOL", payload: { id, value } };
}

export function saveToolOk(tool: Tool): ReduxAction<{}> {
    return { type: "SAVE_TOOL_OK", payload: tool };
}

export function saveToolNo(error: AxiosErrorResponse): ErrorPayl {
    return { type: "SAVE_TOOL_NO", payload: error };
}

export function destroyToolOk(tool_id: number): ErrorPayl {
    return { type: "DESTROY_TOOL_OK", payload: tool_id };
}

export function destroyToolNo(error: AxiosErrorResponse): ErrorPayl {
    return { type: "DESTROY_TOOL_NO", payload: error };
}

export function saveTools(tools: Tool[]): Thunk {
    return (dispatch, getState) => {
        tools.filter(allTools => !!allTools.dirty).map(dirtyTool => {
            let url = API.current.toolSlotsPath + dirtyTool.id;
            axios
                .put<ToolSlot>(url, dirtyTool)
                .then(resp => {
                    dispatch(saveToolSlotOk(resp.data));
                    success(t("Tools saved."));
                }, (e: Error) => {
                    dispatch(saveToolSlotNo(e));
                    error(prettyPrintApiErrors(e));
                });
        });
    };
}

export function destroyTool(tool_id: number): Thunk {
    return (dispatch, getState) => {
        axios
            .delete<Tool>(API.current.toolsPath + tool_id)
            .then(resp => {
                dispatch(destroyToolOk(tool_id));
                success(t("Tool deleted."));
            }, (e: Error) => {
                dispatch(destroyToolNo(e));
                error(prettyPrintApiErrors(e));
            });
    };
}

export function addTool(name: string): Thunk {
    return (dispatch, getState) => {
        axios
            .post<Tool>(API.current.toolsPath, { name })
            .then(resp => {
                dispatch(saveToolOk(resp.data));
                success(t("Tool successfully updated."));
            }, (e: Error) => {
                dispatch(saveToolNo(e));
                error(prettyPrintApiErrors(e));
            });
    };
}
