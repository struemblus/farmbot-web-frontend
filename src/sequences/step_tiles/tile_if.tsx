import * as React from "react";
import { Help, FBSelect, DropDownItem } from "../../ui";
import { copy, remove, isRecursive } from "./index";
import { StepTitleBar } from "./step_title_bar";
import { StepParams } from "../interfaces";
import { IfParams } from "./tile_if/index";
import { If_ } from "./tile_if/if";
import { Then } from "./tile_if/then";
import { Else } from "./tile_if/else";

export function TileIf(props: StepParams) {
  if (props.currentStep.kind === "_if") {
    return <InnerIf
      currentSequence={props.currentSequence}
      currentStep={props.currentStep}
      dispatch={props.dispatch}
      index={props.index}
      resources={props.resources} />;
  } else {
    return <p> Expected "_if" node</p>;
  }
}

function InnerIf(props: IfParams) {
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
