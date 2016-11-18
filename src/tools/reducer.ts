import { generateReducer } from "../redux/generate_reducer";
import { ToolsState } from "./interfaces";
// import { Sync } from "../../interfaces";

let initialState: ToolsState = {
    editorMode: false,
    tool_bays: [
        {
            name: "toolbay 1",
            id: 1234,
        }
    ],
    tool_slots: [
        {
            id: 111,
            tool_bay_id: 1234,
            x: 10,
            y: 20,
            z: 30
        },
        {
            id: 222,
            tool_bay_id: 1234,
            x: 10,
            y: 20,
            z: 30
        },
        {
            id: 333,
            tool_bay_id: 1234,
            x: 10,
            y: 20,
            z: 30
        },
    ],
    tools: [
        {
            id: 1,
            name: "tool1",
            slot_id: 111
        },
        {
            id: 2,
            name: "tool2",
            slot_id: 333
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
    .add<{}>("DELETE_ME_FETCH_ALL", function (state, action) {
        state = initialState;
        return state;
    })
    .add<{ bay: number, slot: number }>("DESTROY_SLOT", function (state, action) {
        // TODO: HACK, array indeces
        // Use _ to find nested instead?
        // state.all.toolBays[action.payload.bay - 1].slots.splice(action.payload.slot - 1, 1);
        return state;
    });

    // .add<Sync>("FETCH_SYNC_OK", function (state, action) {
    //     state.all = action.payload.tools || [];
    //     state.editorMode = "controlling";
    //     return state;
    // });
