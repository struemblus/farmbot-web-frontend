import { Sequence } from "../sequences/interfaces";
import { Tool, ToolSlot, ToolBay } from "../tools/interfaces";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { Plant, FarmEvent, Point } from "../farm_designer/interfaces";
import { Image } from "../images/index";
import { Log } from "../interfaces";
import { Peripheral } from "../controls/peripherals/interfaces";
import { User } from "../auth/interfaces";


export type ResourceName =
  | "device"
  | "farm_events"
  | "images"
  | "logs"
  | "peripherals"
  | "plants"
  | "points"
  | "regimen_items"
  | "regimens"
  | "sequences"
  | "tool_bays"
  | "tool_slots"
  | "tools"
  | "users";

/** This interface is here mostly for safety reasons.
 * If you add a TaggedResource, the type checker will notify you when tag names
 * change. */
interface TaggedResourceBase {
  kind: ResourceName;
  /** Unique identifier and index key.
   * We can't use the object's `id` attribute as a local index key because
   * unsaved objects don't have one.
   */
  uuid: string;
}

export type TaggedResource = TaggedFarmEvent
  | TaggedImage
  | TaggedLog
  | TaggedPeripheral
  | TaggedPlant
  | TaggedPoint
  | TaggedRegimen
  | TaggedRegimenItem
  | TaggedSequence
  | TaggedTool
  | TaggedToolBay
  | TaggedToolSlot
  | TaggedUser;

export interface TaggedRegimen extends TaggedResourceBase {
  kind: "regimens";
  body: Regimen;
}

export interface TaggedTool extends TaggedResourceBase {
  kind: "tools";
  body: Tool;
}

export interface TaggedToolSlot extends TaggedResourceBase {
  kind: "tool_slots";
  body: ToolSlot;
}

export interface TaggedSequence extends TaggedResourceBase {
  kind: "sequences";
  body: Sequence;
}

export interface TaggedPlant extends TaggedResourceBase {
  kind: "plants";
  body: Plant;
}

export interface TaggedFarmEvent extends TaggedResourceBase {
  kind: "farm_events";
  body: FarmEvent;
}

export interface TaggedImage extends TaggedResourceBase {
  kind: "images";
  body: Image;
}

export interface TaggedLog extends TaggedResourceBase {
  kind: "logs";
  body: Log;
}

export interface TaggedPeripheral extends TaggedResourceBase {
  kind: "peripherals";
  body: Peripheral;
}

export interface TaggedPoint extends TaggedResourceBase {
  kind: "points";
  body: Point;
}

export interface TaggedRegimenItem extends TaggedResourceBase {
  kind: "regimen_items";
  body: RegimenItem;
}

export interface TaggedToolBay extends TaggedResourceBase {
  kind: "tool_bays";
  body: ToolBay;
}

export interface TaggedUser extends TaggedResourceBase {
  kind: "users";
  body: User;
}

export function isTaggedResource(x: any): x is TaggedResource {
  return (_.isObject(x)
    && _.isString(x.kind)
    && _.isString(x.uuid)
    && _.isObject(x.body))
}

export function isTaggedRegimen(x: any): x is TaggedRegimen {
  return (isTaggedResource(x) && x.kind == "regimens")
    || whoops(x, "regimens");
}

export function isTaggedSequence(x: any): x is TaggedSequence {
  return (isTaggedResource(x) && x.kind == "sequences")
    || whoops(x, "sequences");
}

export function isTaggedTool(x: any): x is TaggedTool {
  return (isTaggedResource(x) && x.kind == "tools")
    || whoops(x, "tools");
}

export function isTaggedToolSlot(x: any): x is TaggedToolSlot {
  return (isTaggedResource(x) && x.kind == "tool_slots")
    || whoops(x, "tool_slots");
}

/** Warn the developer that bad data was encountered. */
function whoops(x: any, expected: ResourceName) {
  console.warn(`THATS NOT ${expected} : ${JSON.stringify(x)}`);
  return false;
}
