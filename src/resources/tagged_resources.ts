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

export interface Resource<T extends ResourceName, U extends object>
  extends TaggedResourceBase {
  kind: T;
  body: U;
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

export type TaggedRegimen = Resource<"regimens", Regimen>;
export type TaggedTool = Resource<"tools", Tool>;
export type TaggedToolSlot = Resource<"tool_slots", ToolSlot>;
export type TaggedSequence = Resource<"sequences", Sequence>;
export type TaggedPlant = Resource<"plants", Plant>;
export type TaggedFarmEvent = Resource<"farm_events", FarmEvent>;
export type TaggedImage = Resource<"images", Image>;
export type TaggedLog = Resource<"logs", Log>;
export type TaggedPeripheral = Resource<"peripherals", Peripheral>;
export type TaggedPoint = Resource<"points", Point>;
export type TaggedRegimenItem = Resource<"regimen_items", RegimenItem>;
export type TaggedToolBay = Resource<"tool_bays", ToolBay>;
export type TaggedUser = Resource<"users", User>;

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
