import { generateReducer } from "../redux/generate_reducer";
import {
    ToolsState,
    AddToolSlotPayl,
    Tool,
    ToolBay,
    UpdateToolSlotPayl
} from "./interfaces";
import { Sync } from "../interfaces";
import * as _ from "lodash";

let initialState: ToolsState = {
    editorMode: false,
    tool_bays: [{
        id: 1,
        name: "Toolbay 1"
    }],
    tool_slots: [
        {
            id: 1,
            tool_bay_id: 1,
            tool_id: 2,
            created_at: "SOME UTC STRING",
            x: 123,
            y: 456,
            z: 789
        },
        {
            id: 2,
            tool_bay_id: 1,
            tool_id: 3,
            created_at: "SOME UTC STRING",
            x: 123,
            y: 456,
            z: 789
        }
    ],
    tools: [
        {
            id: 2,
            name: "KILL IT WITH FIRE"
        },
        {
            id: 3,
            name: "SCENTED CANDLE"
        }
    ]
};

export let toolsReducer = generateReducer<ToolsState>(initialState)
    .add<Sync>("FETCH_SYNC_OK", function (s, a) {
        s.tool_bays = a.payload.tool_bays || [];
        s.tool_slots = a.payload.tool_slots || [];
        s.tools = a.payload.tools || [];
        return s;
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
    .add<ToolBay>("SAVE_TOOL_BAY_NAME_OK", function (s, a) {
        let { id, name } = a.payload;
        let bay = _.findWhere(s.tool_bays, { id });
        bay.name = name;
        return s;
    })
    .add<AddToolSlotPayl>("ADD_SLOT", function (s, a) {
        let { slotState } = a.payload;
        /** TODO: Temporary TS pleaser */
        let id = s.tool_slots.length + 1;
        let created_at = "SOME UTC STRING";
        let tool_id = 1;
        s.tool_slots.push({
            id,
            tool_id,
            created_at,
            tool_bay_id: a.payload.bay_id,
            x: slotState.x,
            y: slotState.y,
            z: slotState.z
        });
        return s;
    })
    .add<{ tool_id: number }>("DESTROY_TOOL_OK", function (s, a) {
        let { tools } = s;
        let index = _.findIndex(tools, { id: a.payload.tool_id });
        tools.splice(index, 1);
        return s;
    })
    .add<Tool>("SAVE_TOOL_OK", function (s, a) {
        let { name, id } = a.payload;
        s.tools.push({ name, id });
        return s;
    });

