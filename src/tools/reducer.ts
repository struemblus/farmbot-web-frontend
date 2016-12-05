import { generateReducer } from "../redux/generate_reducer";
import {
    ToolsState,
    Tool,
    ToolBay,
    ToolSlot
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
    .add<{ id: number }>("DESTROY_TOOL_SLOT_OK", function (s, a) {
        let { tool_slots } = s;
        let index = _.findIndex(tool_slots, { id: a.payload.id });
        tool_slots.splice(index, 1);
        return s;
    })
    .add<ToolSlot>("UPDATE_TOOL_SLOT_OK", function (s, a) {
        let { tool_slots } = s;
        let index = _.findIndex(s.tool_slots, { id: a.payload.id });
        tool_slots.splice(index, 1, a.payload);
        return s;
    })
    .add<ToolBay>("SAVE_TOOL_BAY_NAME_OK", function (s, a) {
        let { id, name } = a.payload;
        let bay = _.findWhere(s.tool_bays, { id });
        bay.name = name;
        return s;
    })
    .add<ToolSlot>("ADD_TOOL_SLOT_OK", function (s, a) {
        s.tool_slots.push(a.payload);
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

