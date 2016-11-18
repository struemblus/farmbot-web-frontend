import * as axios from "axios";
import { t } from "i18next";
import { Thunk, ReduxAction } from "../redux/interfaces";
import { API } from "../api";
import { Everything } from "../interfaces";
import {
    Tools,
    SaveToolsOk,
    SaveToolsNo,
    ToolBays,
    SaveToolBaysOk,
    SaveToolBaysNo,
    DestroySlot
} from "./interfaces";
import { success, error } from "../logger";
import { prettyPrintApiErrors, AxiosErrorResponse } from "../util";

/** Generic actions */
export function startEditing(): ReduxAction<{}> {
    return { type: "EDIT_TOOLS_START", payload: {} };
}

export function stopEditing(): ReduxAction<{}> {
    return { type: "CONTROL_TOOLS_STOP", payload: {} };
}

/** ToolBay actions */
export function fetchToolBays(): ReduxAction<{}> {
    return { type: "FETCH_TOOL_BAYS", payload: {} };
}

export function destroySlot(bay: number, slot: number): DestroySlot {
    return { type: "DESTROY_SLOT", payload: { bay, slot } };
}

export function saveToolBaysNo(toolBays: AxiosErrorResponse): SaveToolBaysNo {
    return { type: "SAVE_TOOLBAYS_NO", payload: error };
}

export function saveToolBaysOk(toolBays: ToolBays): SaveToolBaysOk {
    return { type: "SAVE_TOOLBAYS_OK", payload: toolBays };
}

export function saveToolBays(toolBays: ToolBays): Thunk {
    return function (dispatch: Function) {
        console.log(dispatch);
        axios.post(API.current.toolBaysPath, toolBays)
            .then(resp => {
                success(t("Saved ToolBays."));
                dispatch({
                    type: "SAVE_TOOLBAYS_OK",
                    payload: resp.data
                });
                stopEditing();
            })
            .catch((err:
                { response: { data: { [reason: string]: string }; } }) => {
                error(prettyPrintApiErrors(err), t("Could not save ToolBays."));
                dispatch(saveToolBaysNo(err));
            });
    };
};

/** Tool actions */
export function saveToolsOk(tools: Tools): SaveToolsOk {
    return { type: "SAVE_TOOLS_OK", payload: tools };
}

export function saveToolsNo(error: AxiosErrorResponse): SaveToolsNo {
    return { type: "SAVE_TOOLS_NO", payload: error };
}

export function saveTools(tools: Tools): Thunk {
    return function (dispatch) {
        let url = API.current.toolsPath;
        let method: Function = axios.post;
        return method(url, tools)
            .then(function (resp: { data: Tools }) {
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
