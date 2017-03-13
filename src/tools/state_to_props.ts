import { ToolBay, ToolSlot, Tool } from "./interfaces";
import { Everything } from "../interfaces";
import * as _ from "lodash";

export interface Props {
  toolBays: ToolBay[];
  toolSlots: ToolSlot[];
  tools: Tool[];
  editorMode: boolean;
  isEditingTools: boolean;
  getToolSlots: Function;
  getTools: Function;
  getChosenTool: Function;
  dispatch: Function;
}

export function mapStateToProps(props: Everything): Props {
  let toolBays = props.tools.tool_bays;
  let toolSlots = props.tools.tool_slots;
  let tools = props.tools.tools.all;
  let editorMode = props.tools.editorMode;
  let isEditingTools = props.tools.tools && props.tools.tools.isEditing;

  let getToolSlots = (toolBayId: number) => {
    return toolSlots.filter(slot => slot.tool_bay_id === toolBayId);
  };

  let getTools = () => {
    return tools;
  };

  let getChosenTool = (toolSlotId: number) => {
    let currentSlot = _.findWhere(toolSlots, { id: toolSlotId });
    return _.findWhere(tools, { id: currentSlot.tool_id });
  };

  return {
    toolBays,
    toolSlots,
    tools,
    editorMode,
    isEditingTools,
    getToolSlots,
    getTools,
    getChosenTool,
    dispatch() { }
  };

}
