import { AxiosErrorResponse } from "../util";

/** Main Tools component */
export interface ToolsState {
    editorMode: boolean;
    all: ToolBay[];
}

/** ToolBay */
export interface ToolBayProps {
    dispatch: Function;
    all: ToolBay[];
}

export interface ToolBayState {

}

export interface ToolBay {
    name: string;
    slots: ToolSlot[];
    help_text: string;
}

export interface ToolBays {
    all: ToolBay[];
}

interface ToolSlot {
    tool_id: number;
    x: number;
    y: number;
    z: number;
}

/** Tools */
export interface Tool {
    name: string;
    bay_id: number;
}

export interface Tools {
    all: Tool[];
}

/** Actions */
export interface SaveToolsOk {
    type: string;
    payload: Tools;
}

export interface SaveToolsNo {
    type: string;
    payload: AxiosErrorResponse;
}

export interface SaveToolBaysOk {
    type: string;
    payload: ToolBays;
}

export interface SaveToolBaysNo {
    type: string;
    payload: AxiosErrorResponse;
}

export interface DestroySlot {
    type: string;
    payload: Object;
}
