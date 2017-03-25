import * as React from "react";
import { DropDownItem, Help } from "../../../ui";
import { TaggedSequence } from "../../../resources/tagged_resources";
import { If, Execute, Nothing } from "farmbot/dist";
import { ResourceIndex } from "../../../resources/interfaces";
import { selectAllSequences, findSequenceById } from "../../../resources/selectors";
import { copy, remove, isRecursive } from "../index";
import { StepTitleBar } from "../step_title_bar";
import { If_ } from "./if";
import { Then } from "./then";
import { Else } from "./else";

export interface IfParams {
  currentSequence: TaggedSequence;
  currentStep: If;
  dispatch: Function;
  index: number;
  resources: ResourceIndex;
}

export type Operator = "lhs"
  | "op"
  | "rhs"
  | "_then"
  | "_else";

export const LHSOptions: DropDownItem[] = [
  { value: "busy", label: "Busy Status (0, 1)" },
  { value: "pin0", label: "Pin 0" },
  { value: "pin1", label: "Pin 1" },
  { value: "pin2", label: "Pin 2" },
  { value: "pin3", label: "Pin 3" },
  { value: "pin4", label: "Pin 4" },
  { value: "pin5", label: "Pin 5" },
  { value: "pin6", label: "Pin 6" },
  { value: "pin7", label: "Pin 7" },
  { value: "pin8", label: "Pin 8" },
  { value: "pin9", label: "Pin 9" },
  { value: "pin10", label: "Pin 10" },
  { value: "pin11", label: "Pin 11" },
  { value: "pin12", label: "Pin 12" },
  { value: "pin13", label: "Pin 13" },
  { value: "x", label: "X position" },
  { value: "y", label: "Y Position" },
  { value: "z", label: "Z position" }
];

export const operatorOptions: DropDownItem[] = [
  { value: "<", label: "is less than" },
  { value: ">", label: "is greater than" },
  { value: "is", label: "is equal to" },
  { value: "not", label: "is not equal to" }
];

export let updateField = (field: Operator, dispatch: Function) =>
  (e: DropDownItem) => {
    console.log("TODO!")
  };

export function seqDropDown(i: ResourceIndex) {
  let results: DropDownItem[] = [];
  selectAllSequences(i)
    .map(function (x) {
      let { body } = x;
      if (_.isNumber(body.id)) {
        results.push({ label: body.name, value: body.id });
      }
    })
  return results;
}

export function initialValue(input: Execute | Nothing, index: ResourceIndex) {
  switch (input.kind) {
    case "execute":
      let id = input.args.sequence_id;
      let seq = findSequenceById(index, id).body;
      if (_.isNumber(seq.id)) {
        return { label: seq.name, value: seq.id }
      } else {
        throw new Error("Failed seq id type assertion.")
      }
    case "nothing":
      return { label: "None", value: 0 }
    default:
      throw new Error("Only _else or _then");
  }
}

export let updateSubSeq = (branch: "_then" | "_else",
  dispatch: Function,
  sequence: TaggedSequence,
  step: If) =>
  (x: DropDownItem) => {
    console.log("CHANGE!");
  }

export function InnerIf(props: IfParams) {
  let {
    index,
    dispatch,
    currentStep,
    currentSequence
  } = props;
  let stuff = { dispatch, step: currentStep, sequence: currentSequence, index };
  let recursive = isRecursive(currentStep, currentSequence);
  return <div>
    <div className="step-wrapper">
      <div className="row">
        <div className="col-sm-12">
          <div className="step-header if-step">
            <StepTitleBar index={index}
              dispatch={dispatch}
              step={currentStep} />
            <i className="fa fa-arrows-v step-control" />
            <i className="fa fa-clone step-control"
              onClick={() => copy(stuff)} />
            <i className="fa fa-trash step-control"
              onClick={() => remove(stuff)} />
            <Help text={(`Detailed documentation coming soon`)} />
            {recursive && (
              <span>
                <i className="fa fa-exclamation-triangle"></i>
                &nbsp;Recursive condition.
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="step-content if-step">
            <div className="row">
              <If_ {...props} />
              <Then {...props} />
              <Else {...props} />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
