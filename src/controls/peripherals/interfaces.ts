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

/** A combination of a peripheral object,
 * plus its index within state.peripheral.all */
export interface IndexedPeripheral {
    index: number;
    peripheral: Peripheral;
}
