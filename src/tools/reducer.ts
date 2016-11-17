import { generateReducer } from "../redux/generate_reducer";
import { ToolsState } from "./interfaces";
// import { Sync } from "../../interfaces";

let initialState: ToolsState = {
    editorMode: "controlling",
    all: []
};

export let peripheralReducer = generateReducer<ToolsState>(initialState)
    .add<{}>("EDIT_TOOLS_START", function (state, action) {
        console.log("REDUCER EDIT START");
        // state.editorMode = "editing";
        return state;
    })
    .add<{}>("CONTROL_TOOLS_START", function (state, action) {
        console.log("REDUCER CONTROL START");
        // state.editorMode = "controlling";
        return state;
    });
    // .add<Sync>("FETCH_SYNC_OK", function (state, action) {
    //     state.all = action.payload.peripherals || [];
    //     state.editorMode = "controlling";
    //     return state;
    // });
