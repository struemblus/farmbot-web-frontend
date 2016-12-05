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
import { prettyPrintApiErrors, AxiosErrorResponse } from "../util";

/** Generic */
export function startEditing(): ReduxAction<{}> {
    return { type: "EDIT_TOOLS_START", payload: {} };
}

export function stopEditing(): ReduxAction<{}> {
    return { type: "EDIT_TOOLS_STOP", payload: {} };
}

/** ToolBays */
export function saveToolBaysNo(toolBays: AxiosErrorResponse): ErrorPayl {
    return { type: "SAVE_TOOL_BAYS_NO", payload: error };
}

export function saveToolBaysOk(toolBays: ToolBay[]): ReduxAction<{}> {
    return { type: "SAVE_TOOL_BAYS_OK", payload: toolBays };
}

export function saveToolBayNameOk(toolBay: ToolBay): ReduxAction<{}> {
    return { type: "SAVE_TOOL_BAY_NAME_OK", payload: toolBay };
}

export function saveToolBays(toolBays: ToolBay[]): Thunk {
    return (dispatch, getState) => {
        axios.patch<ToolBay[]>(API.current.toolBaysPath, toolBays)
            .then(resp => {
                success(t("ToolBays successfully updated."));
                dispatch(saveToolBaysOk(resp.data));
            }, (e: Error) => {
                dispatch(saveToolBaysNo(e));
                error(t(`ToolBays could not be updated: ${e.message}`));
            });
    };
}

export function updateToolBayName(id: string, value: string): Thunk {
    return (dispatch, getState) => {
        axios
            .patch<ToolBay>(API.current.toolBaysPath + id, { name: value })
            .then(resp => {
                dispatch(saveToolBayNameOk(resp.data));
                success(t("ToolBays successfully updated."));
            }, (e: Error) => {
                dispatch(saveToolBaysNo(e));
                error(t(`ToolBays could not be updated: ${e.message}`));
            });
    };
}

/** ToolSlots */
export function saveToolSlotOk(toolSlot: ToolSlot): ReduxAction<{}> {
    return { type: "SAVE_SLOT_OK", payload: toolSlot };
}

export function saveToolSlotNo(toolSlots: AxiosErrorResponse): ErrorPayl {
    return { type: "SAVE_SLOT_NO", payload: error };
}

export function destroyToolSlotOk(id: number): ReduxAction<{}> {
    return { type: "DESTROY_SLOT_OK", payload: id };
}

export function destroyToolSlotNo(toolSlots: AxiosErrorResponse): ErrorPayl {
    return { type: "DESTROY_SLOT_NO", payload: error };
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

export function addSlot(slot: ToolSlot, tool_bay_id: number): Thunk {
    let { x, y, z, tool_id } = slot;
    let data = { x, y, z, tool_id, tool_bay_id };
    return (dispatch, getState) => {
        axios
            .post<ToolSlot>(API.current.toolSlotsPath, data)
            .then(resp => {
                dispatch(saveToolSlotOk(resp.data));
                success(t("ToolSlot updated."));
            }, (e: Error) => {
                dispatch(saveToolSlotNo(e));
                error(prettyPrintApiErrors(e));
            });
    };
}

export function updateSlot(payload: {}): ReduxAction<{}> {
    return { type: "UPDATE_SLOT", payload };
}

/** Tools */
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
