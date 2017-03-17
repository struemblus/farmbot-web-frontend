import { Sequence } from "../sequences/interfaces";
import { DeviceAccountSettings } from "../devices/interfaces";
import { Tool } from "../tools/interfaces";

export type ResourceTag = "tool"
  | "sequence"
  | "device";

export type TaggedResource = TaggedTool
  | TaggedSequence
  | TaggedDevice;

export interface TaggedTool {
  kind: "tool";
  body: Tool;
}

export interface TaggedSequence {
  kind: "sequence";
  body: Sequence;
}

export interface TaggedDevice {
  kind: "device";
  body: DeviceAccountSettings;
}
