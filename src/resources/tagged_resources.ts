import { Sequence } from "../sequences/interfaces";
import { Tool, ToolSlot } from "../tools/interfaces";
import { RestResources } from "./interfaces";
import { Regimen } from "../regimens/interfaces";

export type ResourceTag = keyof RestResources;

/** This interface is here mostly for safety reasons.
 * If you add a TaggedResource, the type checker will notify you when tag names
 * change. */
interface TaggedResourceBase {
  kind: ResourceTag;
}

export type TaggedResource = TaggedTool
  | TaggedSequence
  | TaggedToolSlot
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

