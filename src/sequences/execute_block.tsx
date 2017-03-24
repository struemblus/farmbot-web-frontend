import * as React from "react";
import { copy, remove } from "./step_tiles/index";
import { SequenceBodyItem as Step, Execute } from "farmbot";
import { Sequence, StepParams } from "./interfaces";
import { t } from "i18next";
import { FBSelect, DropDownItem } from "../ui";
import { TaggedSequence } from "../resources/tagged_resources";

/** Removes un-executable sequences, such as "self" or unsaved ones */
function filterSequenceList(sequences: TaggedSequence[] | undefined, sequence: TaggedSequence) {
  let isSaved = (s: Sequence) => !!s.id;
  let notRecursive = (me: Sequence, you: Sequence) => me !== you;
  return (sequences || [])
    .filter(function (seq) {
      // Can't function recurseCant use unsaved sequences.
      return isSaved(seq.body) && notRecursive(sequence.body, seq.body);
    });
}

interface SequenceSelectBoxParams {
  dispatch: Function;
  step: Step;
  sequence: TaggedSequence;
  sequences: TaggedSequence[];
  index: number;
}

function SequenceSelectBox({ dispatch,
  step,
  sequence,
  sequences,
  index }: SequenceSelectBoxParams) {

  let eligibleSequences: TaggedSequence[] = filterSequenceList(sequences, sequence);
  let finalOptions: DropDownItem[] = [];
  let selectedSequence: DropDownItem = { label: "", value: "" };

  let ssid = (step as Execute).args.sequence_id;

  eligibleSequences.map((ts: TaggedSequence) => {
    let seq = ts.body
    if (seq.id === ssid) {
      selectedSequence = { label: seq.name, value: seq.id };
    }
    if (seq.id) {
      finalOptions.push({
        label: seq.name,
        value: seq.id.toString()
      });
    } else {
      throw new Error("Sequence must have ID.");
    }
  });

  function change(e: DropDownItem) {
    let val = e.value;
    if (val) {
      let sequence_id = parseInt(val.toString(), 10);
      let update = { args: { sequence_id } };
      let newStep = Object.assign({}, step, update);
      throw new Error("TODO!");
      // dispatch(changeStep(index, newStep));
    } else {
      throw new Error("Tried to set a non-existant sequence_id");
    }
  };

  return <FBSelect onChange={change}
    initialValue={selectedSequence}
    list={finalOptions}
    placeholder="Pick a sequence (or save a new one)" />;
}

export function ExecuteBlock({ dispatch, currentStep, index, currentSequence, sequences }:
  StepParams) {
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
                <SequenceSelectBox dispatch={dispatch}
                  step={currentStep}
                  sequence={currentSequence}
                  sequences={sequences}
                  index={index} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>);
}
