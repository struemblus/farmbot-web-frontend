import { generateReducer } from "../redux/generate_reducer";
import {
    ToolsState,
    AddToolSlotPayl,
    ToolPayl,
    UpdateToolSlotPayl
} from "./interfaces";
import { Sync } from "../interfaces";
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
        },
        {
            id: 3,
            name: "Laser Beam",
            slot_id: 222
        }
    ]
};

export let toolsReducer = generateReducer<ToolsState>(initialState)
    .add<Sync>("FETCH_SYNC_OK", function (s, a) {
        let state = _.cloneDeep(s);
        state.tool_bays = a.payload.tool_bays || [];
        state.tool_slots = a.payload.tool_slots || [];
        state.tools = a.payload.tools || [];
        return state;
    })
    .add<{}>("EDIT_TOOLS_START", function (s, a) {
        s.editorMode = true;
        return s;
    })
    .add<{}>("EDIT_TOOLS_STOP", function (s, a) {
        s.editorMode = false;
        return s;
    })
    .add<{ slot_id: number }>("DESTROY_SLOT", function (s, a) {
        let { tool_slots } = s;
        let index = _.findIndex(tool_slots, { id: a.payload.slot_id });
        tool_slots.splice(index, 1);
        return s;
    })
    .add<UpdateToolSlotPayl>("UPDATE_SLOT", function (s, a) {
        let { slot_id, property, value } = a.payload;
        let slot = _.findWhere(s.tool_slots, { id: parseInt(slot_id) });
        /** ??? TODO: Tried changing interfaces but can't seem to please TS */
        (slot as any)[property] = parseInt(value);
        return s;
    })
    .add<{ id: string, value: string }>("UPDATE_TOOL_BAY_NAME", function (s, a) {
        let { id, value } = a.payload;
        let bay = _.findWhere(s.tool_bays, { id: parseInt(id) });
        bay.name = value;
        return s;
    })
    .add<AddToolSlotPayl>("ADD_SLOT", function (s, a) {
        let { payload } = a;
        let { slotState } = payload;
        s.tool_slots.push({
            name: slotState.name,
            tool_bay_id: payload.bay_id,
            x: slotState.x,
            y: slotState.y,
            z: slotState.z
        });
        return s;
    })
    .add<{ tool_id: number }>("DESTROY_TOOL", function (s, a) {
        let { tools } = s;
        let index = _.findIndex(tools, { id: a.payload.tool_id });
        tools.splice(index, 1);
        return s;
    })
    .add<ToolPayl>("ADD_TOOL", function (s, a) {
        let { name, slot_id, id } = a.payload;
        s.tools.push({ id, name, slot_id });
        return s;
    });
    // .add<Sync>("FETCH_SYNC_OK", function (state, action) {
    //     state.all = action.payload.tools || [];
    //     state.editorMode = "controlling";
    //     return state;
    // });
