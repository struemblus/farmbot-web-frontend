import { generateReducer } from "../../generate_reducer";
import { PeripheralState } from "./interfaces";

let initialState: PeripheralState = {
    foo: "bar"
};

export let peripheralReducer = generateReducer<PeripheralState>(initialState)
    .add<{}>("FOO", function (state, action) {
        return state;
    });
