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
/** TODO: Remove this action when API is finished */
export function getFakeData(): ReduxAction<{}> {
    return { type: "GET_FAKE_DATA", payload: {} };
}

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
export function saveToolSlotsNo(toolSlots: AxiosErrorResponse): ErrorPayl {
    return { type: "SAVE_TOOL_SLOTS_NO", payload: error };
}

export function saveToolSlotsOk(toolSlots: ToolSlot[]): ReduxAction<{}> {
    return { type: "SAVE_TOOL_SLOTS_OK", payload: toolSlots };
}

export function destroySlot(slot_id?: number): ReduxAction<{}> {
    return { type: "DESTROY_SLOT", payload: { slot_id } };
}

export function addSlot(payload: {}): ReduxAction<{}> {
    return { type: "ADD_SLOT", payload };
}

export function updateSlot(payload: {}): ReduxAction<{}> {
    return { type: "UPDATE_SLOT", payload };
}

export function saveToolSlots(toolSlots: ToolSlot[]): Thunk {
    return function (dispatch) {
        let url = API.current.toolSlotsPath;
        let method: Function = axios.post;
        return method(url, toolSlots)
            .then(function (resp: { data: ToolSlot[] }) {
                success(t("Saved ToolSlots."));
                dispatch(saveToolSlotsOk(resp.data));
            })
            .catch(function (err:
                { response: { data: { [reason: string]: string }; } }) {
                error(prettyPrintApiErrors(err),
                    t("Could not save ToolSlots."));
                dispatch(saveToolBaysNo(err));
            });
    };
};

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
                error(t(`Tool could not be deleted: ${e.message}`));
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
                error(t(`Tool could not be updated: ${e.message}`));
            });
    };
}
