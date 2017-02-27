import { Everything } from "../../interfaces";
import { ToolBay, ToolSlot, Tool } from "../interfaces";

export interface ToolBayFormProps {
  tool_bays: ToolBay[];
  tool_slots: ToolSlot[];
  tools: Tool[];
  dispatch: Function;
}

export function mapStateToPropsToolBay(state: Everything): ToolBayFormProps {

  let tool_bays = state.sync.tool_bays;
  let tool_slots = state.sync.tool_slots;
  let tools = state.tools.tools.all;
  let dispatch = state.dispatch;

  return {
    tool_bays,
    tool_slots,
    tools,
    dispatch
  };
}
