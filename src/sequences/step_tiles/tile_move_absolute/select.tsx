import * as React from "react";
import {
  Tool,
  Coordinate,
  Point,
  Dictionary
} from "farmbot/dist";
import { ResourceIndex } from "../../../resources/interfaces";
import { FBSelect } from "../../../ui/new_fb_select";
import { DropDownItem } from "../../../ui/fb_select";
import {
  groupPointsByType,
  findPointerByTypeAndId,
  findToolById
} from "../../../resources/selectors";
import {
  POINTER_NAMES,
  PointerTypeName,
  AnyPointer
} from "../../../interfaces";
import {
  PointerType,
  TaggedTool
} from "../../../resources/tagged_resources";
import { NULL_CHOICE } from "../../../ui/index";
const TOOL = "TOOL";
const NAME_MAP: Record<PointerTypeName, string> = {
  "GenericPointer": "Map Point",
  "Plant": "Plant",
  "ToolSlot": "Tool Slot",
}

type LocationData = Tool | Coordinate | Point;
type CALLBACK = (out: LocationData) => void;
interface TileMoveAbsProps {
  resources: ResourceIndex;
  selectedItem: LocationData;
  onChange: CALLBACK;
}

export function TileMoveAbsSelect(props: TileMoveAbsProps) {
  let lookup = groupPointsByType(props.resources);
  return <FBSelect
    allowEmpty={true}
    list={formatDropDownItems(lookup)}
    selectedItem={formatSelectedItem(props.resources, props.selectedItem)}
    onChange={handleSelect(props.resources, props.onChange)} />;
}

let handleSelect = (ri: ResourceIndex, cb: CALLBACK) => (d: DropDownItem) => {
  let heading = d.headingId as (typeof TOOL | PointerTypeName);
  if (d.value && _.isNumber(d.value)) {
    switch (heading) {
      case TOOL:
        return cb({ kind: "tool", args: { tool_id: d.value } });
      case "ToolSlot":
      case "Plant":
      case "GenericPointer":
        return cb({
          kind: "point",
          args: { pointer_type: heading, pointer_id: d.value }
        });
      default:
        return cb({
          kind: "coordinate",
          args: { x: 0, y: 0, z: 0, }
        });
    }
  } else {
    return cb({
      kind: "coordinate",
      args: { x: 0, y: 0, z: 0, }
    });
  }
}

function formatSelectedItem(ri: ResourceIndex, l: LocationData): DropDownItem {
  switch (l.kind) {
    case "point": return formatPoint(findPointerByTypeAndId(ri,
      l.args.pointer_type,
      l.args.pointer_id));
    case "tool": return formatTool(findToolById(ri, l.args.tool_id));
    case "coordinate": return NULL_CHOICE;
    default: throw new Error("Unexpected location type: " + JSON.stringify(l));
  };
}

function formatDropDownItems(groups: Dictionary<PointerType[]>): DropDownItem[] {
  return _(POINTER_NAMES)
    .map(name => (groups[name] || []))
    .map(list => list.map(formatPoint))
    .flatten<DropDownItem>()
    .filter(d => !!d.value)
    .sortBy(x => { x.label })
    .value();
}

function formatPoint(point: PointerType): DropDownItem {
  return {
    label: displayName(point.body),
    value: point.body.id || 0,
    headingId: point.body.pointer_type
  }
}

/** Pretty prints a pointer into a format suitable for display in a drop
 * down. Eg: "Tool Slot: Rick's Tool Slot (1, 3, 29)" */
function displayName(point: AnyPointer): string {
  let kind = NAME_MAP[point.pointer_type] || "Point";
  let xyz = `(${point.x || 0}, ${point.y || 0}, ${point.z || 0})`;
  return `${kind}: ${point.name} ${xyz}`;
}

function formatTool(tool: TaggedTool): DropDownItem {
  if (tool.body.id) {
    return { label: tool.body.name, value: tool.body.id, headingId: TOOL };
  } else {
    throw new Error("Impossible! Tools need an id!");
  }
}
