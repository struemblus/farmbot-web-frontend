import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import * as _ from "lodash";
import { NULL_CHOICE } from "../ui/fb_select";
import {
  selectAllToolSlots,
  selectAllTools,
  selectAllToolBays,
  selectCurrentToolSlot,
  findWhere
} from "../resources/selectors";
import { TaggedTool, isTaggedTool } from "../resources/tagged_resources";

export function mapStateToProps(props: Everything): Props {
  let toolBays = selectAllToolBays(props.resources.index);
  let toolSlots = selectAllToolSlots(props.resources.index);
  let tools = selectAllTools(props.resources.index);

  let editingBays = props.tools.editingBays;
  let editingTools = props.tools.editingTools;

  /** Returns sorted tool objects. */
  let getSortedTools = () => tools;

  /** Returns sorted tool slots specific to the tool bay id passed. */
  let getToolSlots = (/** uuid: string */) => {
    // TODO: three things:
    //       1. We don't support multiple bays. Therefore, no need to filter.
    //       2. If we add an index to this resource, we don't need to perform
    //          filtering.
    //       3. Once we do support multiple bays, re-add the slot's UUID param.
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
  let getChosenToolOption = (toolSlotUUID: string) => {
    let chosenTool = getToolByToolSlotUUID(toolSlotUUID);
    if (chosenTool && isTaggedTool(chosenTool) && chosenTool.body.id) {
      return { label: chosenTool.body.name, value: chosenTool.uuid };
    } else {
      return NULL_CHOICE;
    }
  };

  /** Returns a regular tool object chosen in a slot. */
  let getToolByToolSlotUUID = (toolSlotUUID: string): TaggedTool | undefined => {
    let currentSlot = selectCurrentToolSlot(props.resources.index, toolSlotUUID);
    if (currentSlot && currentSlot.kind === "tool_slots") {
      let tool = findWhere((props.resources.index),
        { id: currentSlot.body.tool_id });
      if (tool && isTaggedTool(tool)) {
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
    getSortedTools,
    getToolSlots,
    getToolOptions,
    getChosenToolOption,
    getToolByToolSlotUUID,
    dispatch: props.dispatch,
  };

}
