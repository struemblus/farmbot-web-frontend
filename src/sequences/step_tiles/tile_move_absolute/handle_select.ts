/** Given a dropdown item and a ResourceIndex,
 * figures out the corresponding Tool | Coordinate | Point */
import { DropDownItem } from "../../../ui/index";
import { ResourceIndex } from "../../../resources/interfaces";
import { selectAllPoints, findToolById, findPointerByTypeAndId } from "../../../resources/selectors";
import { KnownGroupTag, LocationData } from "./interfaces";

/** Takes a DropDownItem and turns it into data suitable
 * for MoveAbsolute["args"]["location"] */
export let handleSelect = (index: ResourceIndex) =>
  (input: DropDownItem): LocationData => {
    let tag = input.headingId as KnownGroupTag;
    if (input.value) {
      let id = parseInt("" + input.value);
      switch (tag) {
        case "ToolSlot":
        case "GenericPointer":
        case "Plant":
          let p = findPointerByTypeAndId(index, tag, id);
          if (p && p.body.id) {
            return {
              kind: "point",
              args: { pointer_type: tag, pointer_id: p.body.id }
            };
          } else {
            return bail("Bad point_id: " + JSON.stringify(p));
          }
        case "Tool":
          let tool_id = findToolById(index, id)
            .body
            .id || bail("No id");
          return { kind: "tool", args: { tool_id } };
        default:
          return { kind: "coordinate", args: { x: 0, y: 0, z: 0 } };
      }
    } else {
      debugger;
      return bail("Need a numeric ID here");
    }
  }

function bail(msg: string): never {
  throw new Error(msg);
}
