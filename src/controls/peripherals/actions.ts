import { ReduxAction } from "../../interfaces";
import { Peripheral } from "./interfaces";

export function startEditing(): ReduxAction<{}> {
    return { type: "EDIT_PERIPHERALS_START", payload: {} };
}

export function startControlling(): ReduxAction<{}> {
    return { type: "CONTROL_PERIPHERALS_START", payload: {} };
}

export interface UpdatePeripheral {
    index: number;
    peripheral: {
        // Typescript 2.1 will introduce subset types.
        // TODO: Change this to a subset type when that feature lands.
        label?: string;
        pin?: number;
    };
}

export function updatePeripheral({index, peripheral}: UpdatePeripheral):
    ReduxAction<{}> {
    return {
        type: "UPDATE_PERIPHERAL",
        payload: {
            index,
            peripheral
        }
    };
};
