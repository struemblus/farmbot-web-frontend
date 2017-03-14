import * as React from "react";
import { IStepInput } from "../step_tiles/index";

export function InputUnknown({step, field, dispatch, index}: IStepInput) {
    return <input type="text"
        placeholder={`UNEXPECTED INPUT '${(field || "empty").toString}'`} />;
}
