import { Sequence } from "../sequences/interfaces";
import { Tool, ToolSlot, ToolBay } from "../tools/interfaces";
import { Regimen, RegimenItem } from "../regimens/interfaces";
import { Plant, FarmEvent, Point } from "../farm_designer/interfaces";
import { Image } from "../images/index";
import { Log } from "../interfaces";
import { Peripheral } from "../controls/peripherals/interfaces";
import { User } from "../auth/interfaces";
import { assertUuid } from "./selectors";

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
export interface TaggedResourceBase {
  kind: ResourceName;
  /** Unique identifier and index key.
   * We can't use the object's `id` attribute as a local index key because
   * unsaved objects don't have one.
   */
  uuid: string;
  body: object;
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

/** Spot check to be certain a TaggedResource is what it says it is. */
export function sanityCheck(x: any) {
  if (isTaggedResource(x)) {
    assertUuid(x.kind, x.uuid);
    console.log("We should add more type checks here later.");
    return true;
  } else {
    throw new Error("Bad kind, uuid, or body: " + JSON.stringify(x));
  }
}

export function isTaggedResource(x: any): x is TaggedResource {
  return (_.isObject(x)
    && _.isString(x.kind)
    && _.isString(x.uuid)
    && _.isObject(x.body))
}

let is = (r: ResourceName) => function isOfTag(x: any) {
  let safe = (sanityCheck(x) && isTaggedResource(x) && x.kind == r);
  if (!safe) { debugger; }
  return safe;
};

export let isTaggedRegimen =
  (x: any): x is TaggedRegimen => is("tool_bays")(x);
export let isTaggedSequence =
  (x: any): x is TaggedSequence => is("sequences")(x);
export let isTaggedTool =
  (x: any): x is TaggedTool => is("tools")(x);
export let isTaggedToolSlot =
  (x: any): x is TaggedToolSlot => is("tool_slots")(x);
