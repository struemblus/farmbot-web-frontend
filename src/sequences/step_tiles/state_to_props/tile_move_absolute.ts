import { Everything } from "../../../interfaces";
import { MoveAbsolute, Dictionary, Vector3 } from "farmbot/dist";
import { DropDownItem } from "../../../ui/fb_select";
import { Tool, ToolSlot } from "../../../tools/interfaces";
import { updateMoveAbsStep } from "../../actions";

interface NamedVector3 extends Vector3 {
  name: string;
}

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

  let toolById: Dictionary<Tool | undefined> =
    _.indexBy(props.tools.tools.all, "id");
  let slotById: Dictionary<ToolSlot | undefined> =
    _.indexBy(props.tools.tool_slots);

  // tools WHERE slot_id NOT NULL
  let options = props
    .tools
    .tool_slots
    .filter(slot => slot && slot.tool_id && slot.id)
    .map(function (slot: ToolSlot): DropDownItem {
      let tool = toolById[slot.tool_id as number];
      let { id } = slot;
      if (tool) {
        let { name } = tool;
        return { label: name, value: (id as number) };
      } else {
        throw new Error("Never will happen.");
      }
    });

  let updateTool = (tool: DropDownItem) => {
    let coords: Vector3 | undefined = slotById[tool.value];
    if (coords) {
      let { x, y, z } = coords;
      // // this.setState({ x, y, z, tool.value options: this.state.options }, () => {
      //   this.props.dispatch(updateMoveAbsStep(this.state, this.props.index));
      // });
      let data = {
        x, y, z, value: tool.value
      };
      props.dispatch(updateMoveAbsStep({}))
    }
  };

  //   updateSelect(event: Partial<MoveAbsState>) {

  // }


  // update(event: React.SyntheticEvent<HTMLInputElement>) {
  //   let { name, value } = event.currentTarget;
  //   let state: { [name: string]: string | number } = {};
  //   state[name] = parseInt(value);
  //   this.setState(state, () => {
  //     this.props.dispatch(updateMoveAbsStep(this.state, this.props.index));
  //   });
  // }

  // vectorList.map()
  // .map(x => toolById[(x.tool_id as number)])
  // .filter(x => x);

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
    options,
    selectValue: { value: "Broke", label: "Change ASAP" },
    dispatch(x: any) { },
    all_tools: [],
    updateSelect() { },
    copy() { },
    remove() { }
  };
}
