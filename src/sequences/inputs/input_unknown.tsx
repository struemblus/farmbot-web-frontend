import * as React from "react";
import { IStepInput } from "../interfaces";

export function InputUnknown({ field }: IStepInput) {
  return <input type="text"
    placeholder={`UNEXPECTED INPUT '${(field || "empty").toString}'`} />;
}
