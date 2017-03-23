import { Everything } from "../../../interfaces";
import { MoveAbsolute as Step } from "farmbot/dist";
import { DropDownItem } from "../../../ui/fb_select";
import { changeMoveAbsStepSelect, changeMoveAbsStepValue } from "../../actions";
import { safeStringFetch, CowardlyDictionary } from "../../../util";
import {
  selectAllTools,
  indexByToolId,
  findWhere
} from "../../../resources/selectors";
import {
  TaggedTool,
  isTaggedToolSlot,
  TaggedToolSlot,
} from "../../../resources/tagged_resources";
import { ToolSlot } from "../../../tools/interfaces";

export function mapStateToProps(props: Everything) {

  /** Get data indexed */
  // let toolById = props.resources.tools.byId;
  // let slotByToolId = props.resources.tool_slots.byId;

  /** Create dropdown options */
  // tools WHERE slot_id NOT NULL
  let options = selectAllTools(props.resources.index)
    .map(tool => {
      return { label: tool.body.name, value: tool.uuid };
    });

  /** Fires when a DropDownItem is selected */
  let changeToolSelect = (step: Step,
    index: number,
    dispatch: Function,
    tool: DropDownItem) => {
    dispatch(changeMoveAbsStepSelect(index, tool, step));
  };

  /** Used to compute the values of the input boxes */
  function computeInputValue(kind: string, arg: string, step: Step) {
    switch (kind) {
      case "location":
        return safeStringFetch(step.args.location.args, arg);
      case "offset":
        return safeStringFetch(step.args.offset.args, arg);
      default:
        throw new Error("Something went wrong with input value compute fn.");
    }
  };

  /** Fires whenever a BlurableInput field is blurred */
  let changeInputValue = (value: string,
    kind: string,
    index: number,
    dispatch: Function) => {
    dispatch(changeMoveAbsStepValue(value, kind, index));
  };
  let toolById = indexByToolId(props.resources.index);
  let findSlotByToolId = (tool_id: number) => {
    let query: Partial<ToolSlot> = { tool_id };
    let result = findWhere(props.resources.index, query);
    if (result && isTaggedToolSlot(result)) {
      result.body.tool_id
      return result;
    } else {
      throw new Error("Indexing of tool slots went wrong!");
    }
  }
  return {
    options,
    computeInputValue,
    changeToolSelect,
    changeInputValue,
    toolById,
    findSlotByToolId,
    dispatch: props.dispatch
  };
}
