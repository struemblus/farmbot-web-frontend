import { generateReducer } from "../redux/generate_reducer";
import {
    ToolsState,
    AddToolSlotPayl,
    ToolPayl,
    UpdateToolSlotPayl
} from "./interfaces";
import * as _ from "lodash";
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
            name: "slot1",
            x: 10,
            y: 20,
            z: 30
        },
        {
            id: 222,
            tool_bay_id: 1234,
            name: "slot2",
            x: 40,
            y: 50,
            z: 60
        },
        {
            id: 333,
            tool_bay_id: 1234,
            name: "slot3",
            x: 70,
            y: 80,
            z: 90
        },
    ],
    tools: [
        {
            id: 1,
            name: "Seed Injector",
            slot_id: 111
        },
        {
            id: 2,
            name: "Weed Suppressor",
            slot_id: 333
        }
    ]
};

export let toolsReducer = generateReducer<ToolsState>(initialState)
    .add<{}>("FETCH_ALL", function (state, action) {
        state = initialState;
        return state;
    })
    .add<{}>("EDIT_TOOLS_START", function (state, action) {
        state.editorMode = true;
        return state;
    })
    .add<{}>("EDIT_TOOLS_STOP", function (state, action) {
        state.editorMode = false;
        return state;
    })
    .add<{ slot_id: number }>("DESTROY_SLOT", function (state, action) {
        let { tool_slots } = state;
        let index = _.findIndex(tool_slots, { id: action.payload.slot_id });
        tool_slots.splice(index, 1);
        return state;
    })
    .add<UpdateToolSlotPayl>("UPDATE_SLOT", function (state, action) {
        let { slot_id, property, value } = action.payload;
        let slot = _.findWhere(state.tool_slots, { id: parseInt(slot_id) });
        /** ??? TODO: Tried changing interfaces but can't seem to please TS */
        (slot as any)[property] = parseInt(value);
        return state;
    })
    .add<AddToolSlotPayl>("ADD_SLOT", function (state, action) {
        let { payload } = action;
        let { slotState } = payload;
        state.tool_slots.push({
            name: slotState.name,
            tool_bay_id: payload.bay_id,
            x: slotState.x,
            y: slotState.y,
            z: slotState.z
        });
        return state;
    })
    .add<{ tool_id: number }>("DESTROY_TOOL", function (state, action) {
        let { tools } = state;
        let index = _.findIndex(tools, { id: action.payload.tool_id });
        tools.splice(index, 1);
        return state;
    })
    .add<ToolPayl>("ADD_TOOL", function (state, action) {
        console.log(state.tools);
        let { name, slot_id, id } = action.payload;
        state.tools.push({
            id,
            name,
            slot_id
        });
        return state;
    });
    // .add<Sync>("FETCH_SYNC_OK", function (state, action) {
    //     state.all = action.payload.tools || [];
    //     state.editorMode = "controlling";
    //     return state;
    // });
