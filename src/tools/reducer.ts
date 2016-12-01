import { generateReducer } from "../redux/generate_reducer";
import {
    ToolsState,
    AddToolSlotPayl,
    ToolPayl,
    ToolBay,
    UpdateToolSlotPayl
} from "./interfaces";
import { Sync } from "../interfaces";
import * as _ from "lodash";

let initialState: ToolsState = {
    editorMode: false,
    tool_bays: [],
    tool_slots: [],
    tools: []
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

