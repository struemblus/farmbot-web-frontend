import { generateReducer } from "../redux/generate_reducer";
import {
  ToolsState,
  Tool,
  ToolBay,
} from "./interfaces";
import * as _ from "lodash";

let initialState: ToolsState = {
  editorMode: false,
  tools: { isEditing: false, dirty: false }
};

export let toolsReducer = generateReducer<ToolsState>(initialState)
  .add<{}>("TOGGLE_EDIT_TOOL_BAYS", function (s, a) {
    s.editorMode = !s.editorMode;
    return s;
  })
  .add<{}>("TOGGLE_EDIT_TOOLS", function (s, a) {
    s.tools.isEditing = !s.tools.isEditing;
    return s;
  })
  /** ToolBays */
  .add<ToolBay>("SAVE_TOOL_BAY_OK", function (s, a) {
    s.editorMode = false;
    return s;
  })
  /** Tools */
  .add<Tool[]>("SAVE_TOOLS_OK", function (s, a) {
    s.tools.dirty = false;
    s.tools.isEditing = false;
    return s;
  });
