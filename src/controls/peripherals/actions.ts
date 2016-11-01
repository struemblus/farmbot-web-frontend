import { ReduxAction, Everything } from "../../interfaces";
import { Peripheral } from "./interfaces";
import * as axios from "axios";
import { error } from "../../logger";

/** Transitions the peripherals form from a controlling state
 *  into an editing state */
export function startEditing(): ReduxAction<{}> {
    return { type: "EDIT_PERIPHERALS_START", payload: {} };
}

/** Flips the peripheral form out of the editing state. */
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

/** Triggered when the user uses the inline form on the peripheral box. */
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

/** A combination of a peripheral object,
 * plus its index within state.peripheral.all */
interface IndexedPeripheral {
    index: number;
    peripheral: Peripheral;
}

export function saveAll() {
    return function (dispatch: Function, getState: () => Everything) {
        let state = getState();
        let url = `${state.auth.iss}/api/peripherals/`;
        let peripherals = state.peripherals.all;
        axios
            .post<Peripheral[]>(url, { peripherals })
            .then(function (x) {
                dispatch({
                    type: "REPLACE_PERIPHERALS",
                    payload: x.data
                });
            })
            .catch(function (x) {
                let message = _.get(x,
                    "response.data.error",
                    "There was a problem saving peripherals")
                error(message);
            });
    };
}
