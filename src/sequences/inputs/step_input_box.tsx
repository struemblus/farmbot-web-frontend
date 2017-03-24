import * as React from "react";
import { InputUnknown } from "./input_unknown";
import { InputDefault } from "./input_default";
import { InputChoiceDict, StepInputProps } from "../interfaces";
import { RestResources } from "../../resources/interfaces";
import { ToolSlot, Tool } from "../../tools/interfaces";

const CHOICES: InputChoiceDict = {
  speed: InputDefault,
  pin_number: InputDefault,
  pin_value: InputDefault,
  pin_mode: InputDefault,
  operator: InputDefault,
  x: InputDefault,
  y: InputDefault,
  z: InputDefault,
  stub: InputDefault,
  variable: InputDefault,
  label: InputDefault,
  milliseconds: InputDefault,
  message: InputDefault,
  lhs: InputDefault,
  op: InputDefault,
  rhs: InputDefault,
  sequence_id: InputDefault,
  location: SomethingSpecial
};

export function SomethingSpecial({ step }: StepInputProps) {
  switch (step.kind) {
    case "tool": return <p>This would be a tool</p>;
    case "coordinate": return <p>This would be a coordinate</p>;
    default:
      throw new Error("This expects a tool or coordinate only.");
  }
}

type ArgType =
  "speed"
  | "pin_number"
  | "pin_value"
  | "pin_mode"
  | "operator"
  | "x"
  | "y"
  | "z"
  | "stub"
  | "variable"
  | "label"
  | "milliseconds"
  | "message"
  | "lhs"
  | "op"
  | "rhs"
  | "sequence_id"
  | "location";

export function StepInputBox(props: StepInputProps) {
  switch (props.field) {
    case "label": case "lhs": case "message": case "milliseconds": case "op":
    case "pin_mode": case "pin_number": case "pin_value": case "rhs":
    case "sequence_id": case "speed":
    case "x": case "y": case "z":
      return <InputDefault {...props} />;
    case "location":
      return <SomethingSpecial {...props} />;
    default:
      return <InputUnknown {...props } />;
  }
};


export function update<T>(resource: keyof RestResources,
  id: number,
  body: Tool | ToolSlot) {
  return {
    type: "UPDATE_RESOURCE",
    payload: { resource, id, body }
  }
}
