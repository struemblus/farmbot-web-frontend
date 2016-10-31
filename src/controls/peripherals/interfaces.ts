export type EditorMode = "editing" | "controlling";

export interface PeripheralState {
    editorMode: EditorMode;
    all: Peripheral[];
}

export interface Peripheral {
    id?: number;
    dirty?: boolean;
    pin: number;
    mode: number;
    label: string;
}
