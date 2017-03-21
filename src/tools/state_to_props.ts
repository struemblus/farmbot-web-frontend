import { Everything } from "../interfaces";
import { Props, Tool } from "./interfaces";
import * as _ from "lodash";
import { NULL_CHOICE } from "../ui/fb_select";
import {
  selectAllToolSlots,
  selectAllTools,
  selectAllToolBays,
  selectCurrentToolSlot
} from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {
  let toolBays = selectAllToolBays(props.resources.index);
  let toolSlots = selectAllToolSlots(props.resources.index);
  let tools = selectAllTools(props.resources.index);

  let editingBays = props.tools.editingBays;
  let editingTools = props.tools.editingTools;
  let dirtyTools = props.tools.toolsDirty;

  /** Returns sorted tool objects. */
  let getSortedTools = () => tools;

  /** Returns sorted tool slots specific to the tool bay id passed. */
  let getToolSlots = (toolBayId: number) => {
    // TODO: two things:
    //       1. We don't support multiple bays. Therefore, no need to filter.
    //       2. If we add an index to this resource, we don't need to perform
    //          filtering.
    return toolSlots;
  };

  /** Returns all tools in an <FBSelect /> compatible format. */
  let getToolOptions = () => {
    return _(tools)
      .map(tool => ({ label: tool.body.name, value: (tool.body.id as number) }))
      .filter(ddi => _.isNumber(ddi.value))
      .compact()
      .value();
  };

	/** Returns the current tool chosen in a slot based off the slot's id
	 * and in an <FBSelect /> compatible format. */
  let getChosenToolOption = (toolSlotId: number) => {
    let currentSlot = selectCurrentToolSlot(props.resources.index, toolSlotId)
    let chosenTool = props
      .resources.tools.byId[(currentSlot && currentSlot.tool_id) || 0];
    if (chosenTool && _.isNumber(chosenTool.id)) {
      return { label: chosenTool.name, value: chosenTool.id };
    } else {
      return NULL_CHOICE;
    }
  };

  /** Returns a regular tool object chosen in a slot. */
  let getChosenTool = (toolSlotId: number): Tool | undefined => {
    let currentSlot = props.resources.tool_slots.byId[toolSlotId];
    let tool_id = (currentSlot && currentSlot.tool_id) || 0;
    let tool = currentSlot && props.resources.tools.byId[tool_id];
    if (tool && tool.id) {
      return tool;
    }
  };

  return {
    toolBays,
    toolSlots,
    tools,
    editingBays,
    editingTools,
    dirtyTools,
    getSortedTools,
    getToolSlots,
    getToolOptions,
    getChosenToolOption,
    getChosenTool,
    dispatch: Function,
  };

}
