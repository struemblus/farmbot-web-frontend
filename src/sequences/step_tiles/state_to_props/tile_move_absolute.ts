import { Everything } from "../../../interfaces";
import { MoveAbsolute, Dictionary } from "farmbot/dist";
import { DropDownItem } from "../../../ui/fb_select";
import { Tool, ToolSlot } from "../../../tools/interfaces";

export interface TileMoveAbsoluteProps {
  options: DropDownItem[];
  selectValue: DropDownItem;
  dispatch: Function;
  all_tools: Tool[];
  updateSelect(input: DropDownItem): void;
  copy(): void;
  remove(): void;
}

export function mapStateToProps(props: Everything): TileMoveAbsoluteProps {
  debugger;

  let toolById: Dictionary<Tool | undefined> =
    _.indexBy(props.tools.tools.all, "id");
  let slotById: Dictionary<ToolSlot | undefined> =
    _.indexBy(props.tools.tool_slots);
  // debugger;

  // props.tools.tools.all.map(tool => {
  //   props.tools.tool_slots.map(slot => {
  //     if (tool.id === slot.tool_id && this.state.options) {
  //       if (loc.kind === "tool" &&
  //         loc.args.tool_id === slot.tool_id) {
  //         currSlot = slot;
  //       }
  //       this.state.options.push({
  //         label: tool.name,
  //         value: tool.id,
  //         x: slot.x,
  //         y: slot.y,
  //         z: slot.z
  //       });
  //     }
  //   });
  // });
  // let loc = step.args.location;
  // let currSlot: Partial<Vector3> = {};

  // let { speed } = step.args;
  // switch (loc.kind) {
  //   case "tool":
  //     this.setState({
  //       value: loc.args.tool_id,
  //       speed,
  //       x: currSlot.x,
  //       y: currSlot.y,
  //       z: currSlot.z
  //     });
  //     break;
  //   case "coordinate":
  //     let wow = { ...loc.args };
  //     let ok = { ...this.state };
  //     let probablyTheIssue = {
  //       x: wow.x || ok.x,
  //       y: wow.y || ok.y,
  //       z: wow.z || ok.z,
  //       speed
  //     };
  //     this.setState(probablyTheIssue);
  //     break;
  //   default:
  //     throw new Error("Error getting node kind.");
  // }

  // =========
  return {
    options: [],
    selectValue: { value: "Broke", label: "Change ASAP" },
    dispatch(x: any) { },
    all_tools: [],
    updateSelect() { },
    copy() { },
    remove() { }
  };
}
