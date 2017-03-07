import { Everything } from "../../../interfaces";
import { Dictionary, Vector3 } from "farmbot/dist";
import { DropDownItem } from "../../../ui/fb_select";
import { Tool, ToolSlot } from "../../../tools/interfaces";
// import { updateMoveAbsStep } from "../../actions";

interface NamedVector3 extends Vector3 {
  name: string;
}

export interface TileMoveAbsoluteProps {
  dropDownItems: DropDownItem[];
  initialDropDownItem: DropDownItem;
}

export function mapStateToProps(props: Everything): TileMoveAbsoluteProps {

  let toolById: Dictionary<Tool | undefined> =
    _.indexBy(props.tools.tools.all, "id");
  let slotById: Dictionary<ToolSlot | undefined> =
    _.indexBy(props.tools.tool_slots);

  let dropDownItems = props
    .tools
    .tool_slots
    .filter(slot => slot && slot.tool_id && slot.id)
    .map(function (slot: ToolSlot): DropDownItem {
      let tool = toolById[slot.tool_id as number];
      let { id } = slot;
      if (tool) {
        return { label: tool.name, value: (id as number) };
      } else {
        throw new Error("Never will happen.");
      }
    });

  let updateTool = (tool: DropDownItem) => {
    let coords = slotById[tool.value];
    if (coords) {
      let { x, y, z } = coords;
      console.log("This should be a dispatch");
    }
  };

  return {
    dropDownItems,
    initialDropDownItem: {
      label: "TODO",
      value: "TODO"
    }
  };
}
