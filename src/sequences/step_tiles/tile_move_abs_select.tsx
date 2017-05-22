import * as React from "react";
import { Tool, Coordinate, Point, Dictionary } from "farmbot/dist";
import { ResourceIndex } from "../../resources/interfaces";
import { FBSelect } from "../../ui/new_fb_select";
import { DropDownItem } from "../../ui/fb_select";
import { groupPointsByType } from "../../resources/selectors";
import { POINTER_NAMES, PointerTypeName, AnyPointer } from "../../interfaces";
import { PointerType } from "../../resources/tagged_resources";

const NAME_MAP: Record<PointerTypeName, (string | undefined)> = {
  "GenericPointer": "Map Point",
  "Plant": "Plant",
  "ToolSlot": "Tool Slot",
}
type LocationData = Tool | Coordinate | Point;
interface TileMoveAbsProps {
  resources: ResourceIndex;
  selectedItem: LocationData;
  onChange: (out: LocationData) => void;
}

export function TileMoveAbsSelect(props: TileMoveAbsProps) {
  let lookup = groupPointsByType(props.resources);
  return <FBSelect
    allowEmpty={true}
    list={formatDropDownItems(lookup)}
    selectedItem={formatSelectedItem(props.selectedItem)}
    onChange={handleSelect} />;
}

let handleSelect = () => (d: DropDownItem) => {
  throw new Error("TODO");
}

function formatSelectedItem(l: LocationData): DropDownItem {
  return { value: "WIP - BRB", label: "WIP - BRB" }
}

function formatDropDownItems(groups: Dictionary<PointerType[]>): DropDownItem[] {
  return _(POINTER_NAMES)
    .map(name => (groups[name] || []))
    .map(list => list.map(transfromToDropDown))
    .flatten<DropDownItem>()
    .filter(d => !!d.value)
    .sortBy(x => { x.label })
    .value();
}

function transfromToDropDown(point: PointerType): DropDownItem {
  return {
    label: displayName(point.body),
    value: point.body.id || 0,
    headingId: point.body.pointer_type
  }
}

function displayName(point: AnyPointer): string {
  let kind = NAME_MAP[point.pointer_type] || "Point";
  let xyz = `(${point.x || 0}, ${point.y || 0}, ${point.z || 0})`;
  return `${kind}: ${point.name} ${xyz}`;
}
