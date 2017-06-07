import * as React from "react";
import { IfParams } from "./index";
import { editStep } from "../../../api/crud";
import { Pair } from "farmbot/dist";

const MAGIC_PAIR_NAME = "eager_read_pin";
const EAGER_LOADING_OPTIONS: Pair[] = [
  { kind: "pair", args: { label: MAGIC_PAIR_NAME, value: MAGIC_PAIR_NAME } }
];

export function Options(props: IfParams) {
  function toggleOptions() {
    props.dispatch(editStep({
      sequence: props.currentSequence,
      step: props.currentStep,
      index: props.index,
      executor: (s: typeof props.currentStep) => {
        s.body = s.body || [];
        s.body = (s.body.length) ? [] : EAGER_LOADING_OPTIONS;
      }
    }));
  }
  return <div>
    <div className="col-xs-12 col-md-12">
      <h4>Options</h4>
    </div>
    <div className="col-xs-12 col-md-12">
      <label htmlFor={MAGIC_PAIR_NAME}>
        <input type="checkbox"
          id={MAGIC_PAIR_NAME}
          onChange={toggleOptions}
          checked={!!(props.currentStep.body && props.currentStep.body.length)}
        />
        Read pin before running this block?
      </label>
    </div>
  </div>
}
