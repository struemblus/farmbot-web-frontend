import { ResourceIndex } from "../../../resources/interfaces";
import { LocationData } from "./interfaces";
import { NULL_CHOICE } from "../../../ui/index";
import { dropDownName } from "./generate_list";
import { findToolById, findPointerByTypeAndId } from "../../../resources/selectors";
import { DropDownItem } from "../../../ui/fb_select";

export function formatSelectedDropdown(ri: ResourceIndex, ld: LocationData): DropDownItem {
  let label: string;
  switch (ld.kind) {
    case "tool":
      let tool = findToolById(ri, ld.args.tool_id).body;
      label = dropDownName("Tool", tool.name);
      return { label, value: tool.id || -999 }
    case "point":
      let p =
        findPointerByTypeAndId(ri, ld.args.pointer_type, ld.args.pointer_id).body;
      label = dropDownName(p.pointer_type, " ", { x: p.x, y: p.y, z: p.z })
      return { label, value: p.id || -999 }
    case "coordinate":
    default: return NULL_CHOICE;
  }
}
