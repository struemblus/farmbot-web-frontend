import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import * as _ from "lodash";
import { NULL_CHOICE } from "../ui/fb_select";
import { selectAll } from "../resources/util";

export function mapStateToProps(props: Everything): Props {
  let toolBays = selectAll(props.resources.tool_bays);
  let toolSlots = selectAll(props.resources.tool_slots);
  let tools = selectAll(props.resources.tools);
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

  /** Returns all tools in an <FBSelect /> compatible format. */
  let getToolOptions = () => {
    return _(tools)
      .map(tool => ({ label: tool.name, value: (tool.id as number) }))
      .filter(ddi => _.isNumber(ddi.value))
      .compact()
      .value();
  };

	/** Returns the current tool chosen in a slot based off the slot's id
	 * and in an <FBSelect /> compatible format. */
  let getChosenToolOption = (toolSlotId: number) => {
    let currentSlot = props.resources.tool_slots.byId[toolSlotId];
    let chosenTool = props
      .resources.tools.byId[(currentSlot && currentSlot.tool_id) || 0];
    if (chosenTool && _.isNumber(chosenTool.id)) {
      return { label: chosenTool.name, value: chosenTool.id };
    } else {
      return NULL_CHOICE;
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
    dispatch: Function,
  };

}
