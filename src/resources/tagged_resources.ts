import { Sequence } from "../sequences/interfaces";
import { Tool, ToolSlot } from "../tools/interfaces";
import { RestResources } from "./interfaces";
import { Regimen } from "../regimens/interfaces";
import { Plant, FarmEvent } from "../farm_designer/interfaces";

export type ResourceTag = keyof RestResources;

/** This interface is here mostly for safety reasons.
 * If you add a TaggedResource, the type checker will notify you when tag names
 * change. */
interface TaggedResourceBase {
  kind: ResourceTag;
  /** Unique identifier and index key.
   * We can't use the object's `id` attribute as a local index key because
   * unsaved objects don't have one.
   */
  uuid: string;
}

export type TaggedResource = TaggedTool
  | TaggedSequence
  | TaggedToolSlot
  | TaggedPlant
  | TaggedFarmEvent
  | TaggedRegimen;

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

