import * as React from "react";
import { IStepInput } from "../tiles/index";

export function InputUnknown({step, field, dispatch, index}: IStepInput) {
    return <input type="text"
        placeholder={`UNEXPECTED INPUT '${field.toString}'`} />;
}
