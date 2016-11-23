import * as axios from "axios";
import { t } from "i18next";
import { Thunk, ReduxAction } from "../redux/interfaces";
import { API } from "../api";
import {
    ToolBay,
    ToolSlot,
    Tool,
    SaveToolBaysOk,
    SaveToolBaysNo,
    SaveToolSlotsOk,
    SaveToolSlotsNo,
    DestroySlot,
    SaveToolsOk,
    SaveToolsNo,
    DestroyTool,
} from "./interfaces";
import { success, error } from "../logger";
import { prettyPrintApiErrors, AxiosErrorResponse } from "../util";

/** Generic */
export function startEditing(): ReduxAction<{}> {
    return { type: "EDIT_TOOLS_START", payload: {} };
}

export function stopEditing(): ReduxAction<{}> {
    return { type: "EDIT_TOOLS_STOP", payload: {} };
}

export function fetchAll(): ReduxAction<{}> {
    return { type: "FETCH_ALL", payload: {} };
}

/** ToolBays */
export function saveToolBaysNo(toolBays: AxiosErrorResponse): SaveToolBaysNo {
    return { type: "SAVE_TOOL_BAYS_NO", payload: error };
}

export function saveToolBaysOk(toolBays: ToolBay[]): SaveToolBaysOk {
    return { type: "SAVE_TOOL_BAYS_OK", payload: toolBays };
}

export function saveToolBays(toolBays: Tool[]): Thunk {
    return function (dispatch) {
        let url = API.current.toolBaysPath;
        let method: Function = axios.post;
        return method(url, toolBays)
            .then(function (resp: { data: ToolBay[] }) {
                success(t("Saved ToolBays."));
                dispatch(saveToolBaysOk(resp.data));
            })
            .catch(function (err:
                { response: { data: { [reason: string]: string }; } }) {
                error(prettyPrintApiErrors(err), t("Could not save ToolBays."));
                dispatch(saveToolBaysNo(err));
            });
    };
};

/** ToolSlots */
export function saveToolSlotsNo(toolSlots: AxiosErrorResponse): SaveToolSlotsNo {
    return { type: "SAVE_TOOL_SLOTS_NO", payload: error };
}

export function saveToolSlotsOk(toolSlots: ToolSlot[]): SaveToolSlotsOk {
    return { type: "SAVE_TOOL_SLOTS_OK", payload: toolSlots };
}

export function destroySlot(slot_id?: number): DestroySlot {
    return { type: "DESTROY_SLOT", payload: { slot_id } };
}

export function addSlot(payload: Object) {
    return { type: "ADD_SLOT", payload };
}

export function updateSlot(payload: Object) {
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
export function saveToolsOk(tools: Tool[]): SaveToolsOk {
    return { type: "SAVE_TOOLS_OK", payload: tools };
}

export function saveToolsNo(error: AxiosErrorResponse): SaveToolsNo {
    return { type: "SAVE_TOOLS_NO", payload: error };
}

export function destroyTool(tool_id: number): DestroyTool {
    return { type: "DESTROY_TOOL", payload: { tool_id } };
}

export function addTool(payload: Object): DestroyTool {
    return { type: "ADD_TOOL", payload };
}

export function saveTools(tools: Tool[]): Thunk {
    return function (dispatch) {
        let url = API.current.toolsPath;
        let method: Function = axios.post;
        return method(url, tools)
            .then(function (resp: { data: Tool[] }) {
                success(t("Saved Tools."));
                dispatch(saveToolsOk(resp.data));
            })
            .catch(function (err:
                { response: { data: { [reason: string]: string }; } }) {
                error(prettyPrintApiErrors(err), t("Could not save Tools."));
                dispatch(saveToolsNo(err));
            });
    };
};
