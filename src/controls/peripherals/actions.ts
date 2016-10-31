import { ReduxAction, Everything } from "../../interfaces";
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

interface IndexedPeripheral {
    index: number;
    peripheral: Peripheral;
}

export function saveAll() {
    return function (dispatch: Function, getState: () => Everything) {
        if (1 + 1 === 2) { return alert("Work in progress"); }
        let saveThese: IndexedPeripheral[] = [];
        getState()
            .peripherals
            .all
            .map(function (peripheral, index) {
                if (peripheral.dirty) {
                    saveThese.push({ index, peripheral });
                }
            });

        let all = saveThese.map(function (ip) {
            let { index, peripheral } = ip;
            if (ip.peripheral.dirty) {
                saveThese.push({ index, peripheral });
            }
        });

        Promise
            .all(all)
            .then(function () {
                debugger;
            })
            .catch(function () {
                debugger;
            });
    };
}
