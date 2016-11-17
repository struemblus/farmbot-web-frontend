import * as axios from "axios";
import { t } from "i18next";
import { Thunk, ReduxAction } from "../redux/interfaces";
import { API } from "../api";
import { Tool, SaveToolOk, SaveToolNo } from "./interfaces";
import { success, error } from "../logger";
import { prettyPrintApiErrors, AxiosErrorResponse } from "../util";

export function startEditing(): ReduxAction<{}> {
    return {
        type: "EDIT_TOOLS_START",
        payload: {}
    };
}

export function startControlling(): ReduxAction<{}> {
    return {
        type: "CONTROL_TOOLS_START",
        payload: {}
    };
}

export function saveToolOk(tool: Tool): SaveToolOk {
    return {
        type: "SAVE_TOOL_OK",
        payload: tool
    };
}

export function saveToolNo(error: AxiosErrorResponse): SaveToolNo {
    return {
        type: "SAVE_TOOL_NO",
        payload: error
    };
}

export function saveTool(tool: Tool): Thunk {
    return function (dispatch) {
        let url = API.current.toolsPath;
        let method: Function;
        if (tool.id) {
            url += tool.id;
            method = axios.put;
        } else {
            method = axios.post;
        };
        return method(url, tool)
            .then(function (resp: { data: Tool }) {
                success(t("Saved '{{ToolName}}'",
                    { ToolName: (tool.label || "tool") }));
                dispatch(saveToolOk(resp.data));
            })
            .catch(function (err:
                { response: { data: { [reason: string]: string }; } }) {
                let template = "Unable to save '{{ToolName}}'";
                let context = { ToolName: (tool.label || "tool") };
                error(prettyPrintApiErrors(err), t(template, context));
                dispatch(saveToolNo(err));
            });
    };
};

