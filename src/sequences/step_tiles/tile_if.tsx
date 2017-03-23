import * as React from "react";
import { Help, FBSelect, DropDownItem } from "../../ui";
import { t } from "i18next";
import { copy, remove } from "./index";
import { changeStepSelect, updateSubSequence } from "../actions";
import { StepTitleBar } from "./step_title_bar";
import { StepInputBox } from "../inputs/step_input_box";
import { If } from "farmbot";
import { StepParams, CopyParams } from "../interfaces";
import { TaggedSequence } from "../../resources/tagged_resources";
import { CowardlyDictionary } from "../../util";
const NOTHING = { label: "Nothing", value: 0 };


/**
 *   HEY YOU!!!!!!
 *
 *     REFACTOR THIS !!!!!
 *
 *       This component needs some love.
         I am currently doing the "Great Redux Refactor of Mar 2017" and can't
 *       Right now.
 *
 *          - RC
 */
let LHSOptions: DropDownItem[] = [
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

let operatorOptions: DropDownItem[] = [
  { value: "<", label: "is less than" },
  { value: ">", label: "is greater than" },
  { value: "is", label: "is equal to" },
  { value: "not", label: "is not equal to" }
];

/** Convert a list of TaggedSequences into a list of DropDownItems */
function toDropdownList(sequences: TaggedSequence[]): DropDownItem[] {
  let choices: DropDownItem[] = [];
  sequences.map((seq) => {
    (_.isNumber(seq.body.id)) ?
      choices.push({ value: (seq.body.id), label: seq.body.name }) : undefined;
  });
  choices.push(NOTHING);
  return choices;
}

export function TileIf({ dispatch, currentStep, index, sequences, currentSequence }:
  StepParams) {
  if (currentStep.kind === "_if") {
    let byId: CowardlyDictionary<TaggedSequence> = _.indexBy(sequences, "id");
    type ArgName = keyof typeof currentStep.args;
    type FieldName = "sequence_id";
    let args = currentStep.args;
    let { lhs, op } = args;
    let else_optn: DropDownItem | undefined;
    switch (currentStep.args._else.kind) {
      case "execute":
        let ts = byId[currentStep.args._else.args.sequence_id];
        let seq = ts && ts.body;
        if (seq && seq.id) { else_optn = { value: seq.id, label: seq.name }; }
        break;
      case "nothing": else_optn = NOTHING;
    }
    else_optn = else_optn || NOTHING;
    let then_optn: DropDownItem | undefined;
    switch (currentStep.args._then.kind) {
      case "execute":
        let ts = byId[currentStep.args._then.args.sequence_id];
        let seq = ts && ts.body;
        if (seq && seq.id) {
          then_optn = { value: seq.id, label: seq.name };
        }
        break;
      case "nothing": then_optn = NOTHING;
    }
    then_optn = then_optn || NOTHING;
    let update = (field: ArgName) => (e: DropDownItem) => {
      let { value } = e;
      if (value) { dispatch(changeStepSelect(value, index, field)); }
    };

    let updateSubSeq = (field: FieldName, type: ArgName) => (e: DropDownItem) => {
      let { value } = e;
      if (value && field && type) {
        dispatch(updateSubSequence(value, index, field, type));
      }
    };

    var isRecursive = (then_optn && then_optn.value === currentSequence.body.id)
      || (else_optn && else_optn.value === currentSequence.body.id);
    let p: InnerIfParams = {
      else_optn,
      seqDropDown: toDropdownList(sequences),
      updateSubSeq,
      then_optn,
      isRecursive,
      currentStep,
      copy,
      index,
      dispatch,
      sequence: currentSequence,
      update,
      lhs,
      op
    }
    return <InnerIf {...p} />;
  } else {
    return <p> Expected "_if" node</p>;
  }
}

type Brb = "lhs" | "op" | "rhs" | "_then" | "_else";
interface InnerIfParams {
  else_optn: DropDownItem;
  seqDropDown: DropDownItem[];
  updateSubSeq(field: "sequence_id", type: Brb): (e: DropDownItem) => void
  update(field: "lhs" | "op" | "rhs" | "_then" | "_else"): (e: DropDownItem) => void
  then_optn: DropDownItem;
  isRecursive: boolean;
  currentStep: If;
  copy(i: CopyParams): void
  index: number;
  dispatch: Function;
  sequence: TaggedSequence;
  lhs: string;
  op: string;
}

function InnerIf({
  else_optn,
  seqDropDown,
  updateSubSeq,
  then_optn,
  isRecursive,
  currentStep,
  copy,
  index,
  dispatch,
  sequence,
  update,
  lhs,
  op
}: InnerIfParams) {
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
              onClick={() => copy({ dispatch, step: currentStep })} />
            <i className="fa fa-trash step-control"
              onClick={() => remove({ dispatch, index })} />
            <Help text={(`Detailed documentation coming soon`)} />
            {isRecursive && (
              <span>
                <i className="fa fa-exclamation-triangle"></i>
                &nbsp;Recursive sequence.
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="step-content if-step">
            <div className="row">
              <div className="col-xs-12 col-md-12">
                <h4 className="top">IF...</h4>
              </div>
              <div className="col-xs-4 col-md-4">
                <label>{t("Variable")}</label>
                <FBSelect
                  list={LHSOptions}
                  placeholder="Left hand side"
                  onChange={update("lhs")}
                  initialValue={{ label: lhs, value: lhs }}
                />
              </div>
              <div className="col-xs-4 col-md-4">
                <label>{t("Operator")}</label>
                <FBSelect
                  list={operatorOptions}
                  placeholder="Operation"
                  onChange={update("op")}
                  initialValue={{ label: op, value: op }}
                />
              </div>
              <div className="col-xs-4 col-md-4">
                <label>{t("Right hand side")}</label>
                <StepInputBox dispatch={dispatch}
                  step={currentStep}
                  index={index}
                  field="rhs" />
              </div>
              <div className="col-xs-12 col-md-12">
                <h4>THEN...</h4>
              </div>
              <div className="col-xs-12 col-md-12">
                <label>{t("Execute Sequence")}</label>
                <FBSelect
                  list={seqDropDown}
                  placeholder="Sequence..."
                  onChange={updateSubSeq("sequence_id", "_then")}
                  initialValue={then_optn}
                />
              </div>
              <div className="col-xs-12 col-md-12">
                <h4>ELSE...</h4>
              </div>
              <div className="col-xs-12 col-md-12">
                <label>{t("Execute Sequence")}</label>
                <FBSelect
                  list={seqDropDown}
                  placeholder="None (continue to next step)"
                  onChange={updateSubSeq("sequence_id", "_else")}
                  initialValue={else_optn}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>;
}
