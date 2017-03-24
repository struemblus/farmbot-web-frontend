import * as React from "react";
import { copy, remove } from "./step_tiles/index";
import { StepParams } from "./interfaces";
import { t } from "i18next";
import { FBSelect, DropDownItem } from "../ui";
import { selectAllSequences } from "../resources/selectors";
import { Execute } from "farmbot/dist";
import { TaggedSequence } from "../resources/tagged_resources";
import { ResourceIndex } from "../resources/interfaces";

export function ExecuteBlock(p: StepParams) {
  if (p.currentStep.kind === "execute") {
    return <RefactoredExecuteBlock currentStep={p.currentStep}
      currentSequence={p.currentSequence}
      index={p.index}
      dispatch={p.dispatch}
      resources={p.resources} />;
  } else {
    throw new Error("Thats not an execute block!");
  }
}

interface ExecBlockParams {
  currentStep: Execute;
  currentSequence: TaggedSequence;
  dispatch: Function;
  index: number;
  resources: ResourceIndex;
}
export function RefactoredExecuteBlock(props: ExecBlockParams) {
  let { dispatch, currentStep, index, currentSequence } = props;
  return (<div>
    <div className="step-wrapper">
      <div className="row">
        <div className="col-sm-12">
          <div className="step-header execute-step">
            <input className="step-label" placeholder="Execute" />
            <i className="fa fa-arrows-v step-control" />
            <i className="fa fa-clone step-control"
              onClick={() => copy({
                dispatch,
                step: currentStep,
                sequence: currentSequence
              })} />
            <i className="fa fa-trash step-control"
              onClick={() => remove({ dispatch, index, sequence: currentSequence })} />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <div className="step-content execute-step">
            <div className="row">
              <div className="col-xs-12">
                <label>{t("Sequence")}</label>
                <SequenceSelectBox {...props} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
}

export function SequenceSelectBox(props: ExecBlockParams) {
  return <FBSelect onChange={changeSelection(props)}
    initialValue={selectedSequence(props)}
    list={sequenceDropDownList(props)}
    placeholder="Pick a sequence (or save a new one)" />
}

let changeSelection = (props: ExecBlockParams) => (input: DropDownItem) => {
}

function sequenceDropDownList(p: ExecBlockParams) {
  let output: DropDownItem[] = [];
  selectAllSequences(p.resources)
    .map(function (x) {
      let { id, name } = x.body;
      if (_.isNumber(id) && (id !== p.currentStep.args.sequence_id)) {
        output.push({ label: name, value: id })
      }
    })
  return output;
}

function selectedSequence(p: ExecBlockParams) {
  let all = sequenceDropDownList(p)
  let output = all[0] || { label: "Please select a sequence.", value: 0 };
  all.map(function (ddi) {
    let step = p.currentStep;
    let id = ddi.value;
    if (step.args.sequence_id === id) {
      output.value = ddi.value;
      output.label = ddi.label;
    }
  })
  return output;
}
