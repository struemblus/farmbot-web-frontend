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

  function maybeShowOptions() {
    switch (props.currentStep.args.lhs) {
      case "x": case "y": case "z": return <span />;
      default:
        let checked =
          !!(props.currentStep.body && props.currentStep.body.length);
        return <div className="col-xs-12 col-md-12">
          <label htmlFor={MAGIC_PAIR_NAME}>
            <input type="checkbox"
              id={MAGIC_PAIR_NAME}
              onChange={toggleOptions}
              checked={checked} />
            Read pin before running this step?
         </label>
        </div>;
    }
  }

  return <div>
    {maybeShowOptions()}
  </div>
}
