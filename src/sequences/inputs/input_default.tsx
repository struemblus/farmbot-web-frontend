import * as React from "react";
import { updateStep } from "../step_tiles/index";
import * as _ from "lodash";
import { IStepInput } from "../interfaces";

export function InputDefault({
  step,
  field,
  dispatch,
  index
}: IStepInput) {
  let raw = (step.args as any)[field];
  let notUndefied = (_.isString(raw) || _.isNumber(raw));
  let val = notUndefied ? raw : "";

  return <input type="text"
    value={val}
    onChange={updateStep({ dispatch, step, index, field })} />;
}
