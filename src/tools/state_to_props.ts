import { Everything } from "../interfaces";
import { Props, Tool } from "./interfaces";
import * as _ from "lodash";
import { NULL_CHOICE } from "../ui/fb_select";
import {
  selectAllToolSlots,
  selectAllTools,
  selectAllToolBays,
  selectCurrentToolSlot,
  getToolByUUID
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
  let getChosenToolOption = (uuid: string) => {
    let currentSlot = selectCurrentToolSlot(props.resources.index, uuid);
    let chosenTool = getToolByUUID(props.resources.index, "tools", uuid);
    if (chosenTool && chosenTool.body.id && chosenTool.kind === "tools") {
      return { label: chosenTool.body.name, value: chosenTool.body.id };
    } else {
      return NULL_CHOICE;
    }
  };

  /** Returns a regular tool object chosen in a slot. */
  let getChosenTool = (toolSlotId: number): Tool | undefined => {
    let currentSlot = selectCurrentToolSlot(props.resources.index, toolSlotId);
    if (currentSlot && currentSlot.kind === "tool_slots") {
      let tool_id = (currentSlot && currentSlot.body.tool_id) || 0;
      let tool = getToolByUUID(props.resources.index, "tools", tool_id);
      if (tool && tool.body.id) {
        return tool;
      }
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
