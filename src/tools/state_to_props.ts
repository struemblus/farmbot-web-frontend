import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import * as _ from "lodash";

export function mapStateToProps(props: Everything): Props {
  let toolBays = props.tools.tool_bays;
  let toolSlots = props.tools.tool_slots;
  let tools = props.tools.tools.all;
  let editorMode = props.tools.editorMode;
  let isEditingTools = props.tools.tools.isEditing;
  let dirtyTools = props.tools.tools.dirty;

  /** Returns sorted tool objects. */
  let getSortedTools = () => {
    return _.sortBy(tools, "id");
  };

  /** Returns sorted tool slots specific to the tool bay id passed. */
  let getToolSlots = (toolBayId: number) => {
    let currentSlots = toolSlots.filter(slot => slot.tool_bay_id === toolBayId);
    return _.sortBy(currentSlots, "id");
  };

  /** Returns all tools in an <FBSelect /> compatible format. If a 
   * slot id is passed, it will become available in the callback. */
  let getToolOptions = (toolSlotId: number) => {
    return tools.map(tool => {
      if (toolSlotId) {
        return { label: tool.name, value: tool.id, slot_id: toolSlotId };
      } else {
        return { label: tool.name, value: tool.id };
      }
    });
  };

	/** Returns the current tool chosen in a slot based off the slot's id 
	 * and in an <FBSelect /> compatible format. */
  let getChosenToolOption = (toolSlotId: number) => {
    let currentSlot = _.findWhere(toolSlots, { id: toolSlotId });
    let chosenTool = _.findWhere(tools, { id: currentSlot.tool_id });
    if (chosenTool) {
      return { label: chosenTool.name, value: chosenTool.id };
    } else {
      return { label: "None", value: "", slot_id: toolSlotId };
    }
  };

  /** Returns a regular tool object chosen in a slot. */
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
    dirtyTools,
    getSortedTools,
    getToolSlots,
    getToolOptions,
    getChosenToolOption,
    getChosenTool,
    dispatch() { },
  };

}
