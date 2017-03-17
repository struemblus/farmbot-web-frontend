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

export let toolsReducer = generateReducer<ToolsState>(initialState);
