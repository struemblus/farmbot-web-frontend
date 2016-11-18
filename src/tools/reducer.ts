import { generateReducer } from "../redux/generate_reducer";
import { ToolsState } from "./interfaces";
// import { Sync } from "../../interfaces";

let initialState: ToolsState = {
    editorMode: false,
    all: [
        {
            name: "toolbay 1",
            help_text: "Wow. Much words. So help.",
            slots: [
                {
                    tool_id: 1,
                    x: 10,
                    y: 20,
                    z: 30
                },
                {
                    tool_id: 2,
                    x: 10,
                    y: 20,
                    z: 30
                },
                {
                    tool_id: 3,
                    x: 10,
                    y: 20,
                    z: 30
                }
            ]
        },
        {
            name: "toolbay 2",
            help_text: "Some other stuff.",
            slots: [
                {
                    tool_id: 4,
                    x: 10,
                    y: 20,
                    z: 30
                }
            ]
        }
    ]
};

export let toolsReducer = generateReducer<ToolsState>(initialState)
    .add<{}>("EDIT_TOOLS_START", function (state, action) {
        state.editorMode = true;
        return state;
    })
    .add<{}>("CONTROL_TOOLS_STOP", function (state, action) {
        state.editorMode = false;
        return state;
    })
    .add<{}>("FETCH_TOOL_BAYS", function (state, action) {
        state = initialState;
        return state;
    })
    .add<{ bay: number, slot: number }>("DESTROY_SLOT", function (state, action) {
        // TODO: HACK, array indeces
        // Use _ to find nested instead?
        state.all[action.payload.bay - 1].slots.splice(action.payload.slot - 1, 1);
        return state;
    });

    // .add<Sync>("FETCH_SYNC_OK", function (state, action) {
    //     state.all = action.payload.tools || [];
    //     state.editorMode = "controlling";
    //     return state;
    // });
