import * as React from "react";
import { Tool, Coordinate, Point } from "farmbot/dist";
import { ResourceIndex } from "../../resources/interfaces";
import { FBSelect } from "../../ui/new_fb_select";
import { DropDownItem } from "../../ui/fb_select";

type LocationData = Tool | Coordinate | Point;
interface TileMoveAbsProps {
  resources: ResourceIndex;
  selectedItem: LocationData;
  onChange: (out: LocationData) => void;
}

export function TileMoveAbsSelect(props: TileMoveAbsProps) {
  return <FBSelect
    allowEmpty={true}
    list={formatDropDownItems()}
    selectedItem={formatSelectedItem()}
    onChange={handleSelect} />;
}

function handleSelect(d: DropDownItem) {
  throw new Error("TODO");
}

function formatSelectedItem(): DropDownItem {
  return { value: "WIP - BRB", label: "WIP - BRB" }
}

function formatDropDownItems(): DropDownItem[] {
  return [];
}
