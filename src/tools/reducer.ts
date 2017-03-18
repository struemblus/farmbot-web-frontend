import { generateReducer } from "../redux/generate_reducer";
import {
  ToolsState,
  Tool,
  ToolBay,
} from "./interfaces";
import * as _ from "lodash";

let initialState: ToolsState = {
  // TODO: Put this stuff into component state to save all the over head of a
  // actionCreator -> action -> dispatcher -> reducer.
  editingTools: false,
  toolsDirty: false,
  editingBays: false
};

export let toolsReducer = generateReducer<ToolsState>(initialState)
  .add<{}>("TOGGLE_EDIT_TOOLS", function (state, action) {
    state.editingTools = true;
    return state;
  });
