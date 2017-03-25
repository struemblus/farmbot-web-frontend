import * as React from "react";
import { InputUnknown } from "./input_unknown";
import { InputDefault } from "./input_default";
import { StepInputProps } from "../interfaces";

type ArgType = "speed" | "pin_number" | "pin_value" | "pin_mode" | "operator"
  | "x" | "y" | "z" | "stub" | "variable" | "label" | "milliseconds" | "message"
  | "lhs" | "op" | "rhs" | "sequence_id" | "location";

export function StepInputBox(props: StepInputProps) {
  switch (props.field) {
    case "label": case "lhs": case "message": case "milliseconds": case "op":
    case "pin_mode": case "pin_number": case "pin_value": case "rhs":
    case "sequence_id": case "speed":
    case "x": case "y": case "z":
      return <InputDefault {...props} />;
    default:
      return <InputUnknown {...props } />;
  }
};
