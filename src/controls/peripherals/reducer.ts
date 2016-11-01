import { generateReducer } from "../../generate_reducer";
import { PeripheralState, Peripheral } from "./interfaces";
import { UpdatePeripheral } from "./actions";

let initialState: PeripheralState = {
    editorMode: "controlling",
    all: [
        { pin: 13, mode: 0, label: "LED" },
        { pin: 10, mode: 0, label: "Water Valve" },
        { pin: 9, mode: 0, label: "Vacuum Pump" }
    ]
};

export let peripheralReducer = generateReducer<PeripheralState>(initialState)
    .add<{}>("EDIT_PERIPHERALS_START", function (state, action) {
        state.editorMode = "editing";
        return state;
    })
    .add<{}>("CONTROL_PERIPHERALS_START", function (state, action) {
        state.editorMode = "controlling";
        return state;
    })
    .add<Peripheral[]>("REPLACE_PERIPHERALS", function (state, action) {
        state.all = action.payload;
        state.editorMode = "controlling";
        return state;
    })
    .add<UpdatePeripheral>("UPDATE_PERIPHERAL", function (s, a) {
        let target = s.all[a.payload.index];
        _.assign(target, a.payload.peripheral, { dirty: true });
        return s;
    });
