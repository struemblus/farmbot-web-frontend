import { generateReducer } from "../../generate_reducer";
import { PeripheralState } from "./interfaces";

let initialState: PeripheralState = {
    editorMode: "controlling"
};

export let peripheralReducer = generateReducer<PeripheralState>(initialState)
    .add<{}>("EDIT_PERIPHERALS_START", function (state, action) {
        state.editorMode = "editing";
        return state;
    })
    .add<{}>("CONTROL_PERIPHERALS_START", function (state, action) {
        state.editorMode = "controlling";
        return state;
    });
