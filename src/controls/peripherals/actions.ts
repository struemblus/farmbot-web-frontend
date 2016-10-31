import { ReduxAction } from "../../interfaces";

export function startEditing(): ReduxAction<{}> {
    return { type: "EDIT_PERIPHERALS_START", payload: {} };
}

export function startControlling(): ReduxAction<{}> {
    return { type: "CONTROL_PERIPHERALS_START", payload: {} };
}
