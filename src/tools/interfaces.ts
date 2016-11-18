import { AxiosErrorResponse } from "../util";

/** Main */
export interface ToolsState {
    editorMode: boolean;
    tool_bays: ToolBay[];
    tool_slots: ToolSlot[];
    tools: Tool[];
}

/** Related */
export interface ListAndFormProps {
    dispatch: Function;
    all: ToolsState;
}

export interface ToolBay {
    id: number;
    name: string;
}

export interface ToolSlot {
    id: number;
    tool_bay_id: number;
    x: number;
    y: number;
    z: number;
}

export interface Tool {
    id: number;
    name: string;
    slot_id: number;
}

/** Actions */
export interface SaveToolBaysOk {
    type: string;
    payload: Object;
}

export interface SaveToolBaysNo {
    type: string;
    payload: AxiosErrorResponse;
}

export interface SaveToolSlotsOk {
    type: string;
    payload: Object;
}

export interface SaveToolSlotsNo {
    type: string;
    payload: AxiosErrorResponse;
}

export interface SaveToolsOk {
    type: string;
    payload: Object;
}

export interface SaveToolsNo {
    type: string;
    payload: AxiosErrorResponse;
}
