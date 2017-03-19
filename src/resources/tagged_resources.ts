import { Sequence } from "../sequences/interfaces";
import { DeviceAccountSettings } from "../devices/interfaces";
import { Tool } from "../tools/interfaces";
import { RestResources } from "./interfaces";

export type ResourceTag = keyof RestResources;

/** This interface is here mostly for safety reasons.
 * If you add a TaggedResource, the type checker will notify you when tag names
 * change. */
interface TaggedResourceBase {
  kind: ResourceTag;
}

export type TaggedResource = TaggedTool
  | TaggedSequence;

export interface TaggedTool extends TaggedResourceBase {
  kind: "tools";
  body: Tool;
}

export interface TaggedSequence extends TaggedResourceBase {
  kind: "sequences";
  body: Sequence;
}

