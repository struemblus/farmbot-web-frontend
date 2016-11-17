import { AxiosErrorResponse } from "../util";

type EditorMode = "editing" | "controlling";

/** Main Tools component */
export interface ToolsState {
    editorMode: EditorMode;
    all: Tool[];
}

/** Tool form */
export interface ToolsFormState {
    label: string;
    x: number;
    y: number;
    z: number;
}

export interface ToolsFormProps {
    dispatch: Function;
    editorMode: EditorMode;
}

/** Tool item */
export interface Tool {
    id?: number;
    label: string;
    x: number;
    y: number;
    z: number;
}

/** Actions */
export interface SaveToolOk {
    type: string;
    payload: Tool;
}

export interface SaveToolNo {
    type: string;
    payload: AxiosErrorResponse;
}
