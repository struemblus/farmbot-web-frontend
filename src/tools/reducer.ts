import { generateReducer } from "../redux/generate_reducer";
import { ToolsState } from "./interfaces";

let initialState: ToolsState = {
  // TODO: Put this stuff into component state to save all the over head of a
  // actionCreator -> action -> dispatcher -> reducer.
  editingTools: false,
  editingBays: false
};

export let toolsReducer = generateReducer<ToolsState>(initialState)
  .add<{}>("TOGGLE_EDIT_TOOLS", function (state, action) {
    state.editingTools = !state.editingTools;
    return state;
  })
  .add<{}>("TOGGLE_EDIT_TOOL_BAYS", function (state, action) {
    state.editingBays = !state.editingBays;
    return state;
  });
