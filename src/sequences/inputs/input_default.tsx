import * as React from "react";
import { IStepInput } from "../tiles/index";
import { updateStep } from "../tiles/index";

export function InputDefault({step, field, dispatch, index}: IStepInput) {
    let raw = (step.args as any)[field];
    let notUndefied = (_.isString(raw) || _.isNumber(raw));
    let val = notUndefied ? raw : "";

    return <input type="text"
        value={val}
        onChange={updateStep({ dispatch, step, index, field })} />;
}
