import { Everything } from "../../../interfaces";
import { Dictionary, MoveAbsolute as Step } from "farmbot/dist";
import { DropDownItem } from "../../../ui/fb_select";
import { Tool, ToolSlot } from "../../../tools/interfaces";
import { changeMoveAbsStepSelect, changeMoveAbsStepValue } from "../../actions";
import { safeStringFetch } from "../../../util";

export interface TileMoveAbsoluteProps {
<<<<<<< HEAD
  options: DropDownItem[];
  dispatch: Function;
  compute(kind: string, arg: string, step: Step): string;
  changeToolSelect(step: Step,
    index: number,
    dispatch: Function,
    tool: DropDownItem): void;
  changeInputValue(value: string,
    type: string,
    index: number,
    dispatch: Function): void;
=======
  dropDownItems: DropDownItem[];
  initialDropDownItem: DropDownItem;
>>>>>>> 70b6a744b7dc5db1521becf90f96fd51ddf6cf35
}

export function mapStateToProps(props: Everything): TileMoveAbsoluteProps {

  /** Get data indexed */
  let toolById: Dictionary<Tool | undefined> =
    _.indexBy(props.tools.tools.all, "id");
  let slotById: Dictionary<ToolSlot | undefined> =
    _.indexBy(props.tools.tool_slots, "tool_id");

<<<<<<< HEAD
  /** Create dropdown options */
  // tools WHERE slot_id NOT NULL
  let options = props
=======
  let dropDownItems = props
>>>>>>> 70b6a744b7dc5db1521becf90f96fd51ddf6cf35
    .tools
    .tool_slots
    .filter(slot => slot && slot.tool_id && slot.id)
    .map(function (slot: ToolSlot): DropDownItem {
      let tool = toolById[slot.tool_id as number];
      if (tool) {
<<<<<<< HEAD
        let { name, id } = tool;
        return { label: name, value: (id as number) };
=======
        return { label: tool.name, value: (id as number) };
>>>>>>> 70b6a744b7dc5db1521becf90f96fd51ddf6cf35
      } else {
        throw new Error("Never will happen.");
      }
    });

  /** Fires when a DropDownItem is selected */
  let changeToolSelect = (step: Step,
    index: number,
    dispatch: Function,
    tool: DropDownItem) => {
    let coords = slotById[tool.value];
    if (coords) {
      let { x, y, z } = coords;
<<<<<<< HEAD
      dispatch(changeMoveAbsStepSelect({ x, y, z }, index, tool, step));
    } else {
      throw new Error("Tool doesn't have coordinates (a slot).");
    }
  };

  /** Used to compute the values of the input boxes */
  function compute(kind: string, arg: string, step: Step) {
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

  return {
    options,
    compute,
    changeToolSelect,
    changeInputValue,
    dispatch() { }
=======
      console.log("This should be a dispatch");
    }
  };

  return {
    dropDownItems,
    initialDropDownItem: {
      label: "TODO",
      value: "TODO"
    }
>>>>>>> 70b6a744b7dc5db1521becf90f96fd51ddf6cf35
  };
}
