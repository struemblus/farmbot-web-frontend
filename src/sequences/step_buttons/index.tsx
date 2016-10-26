import * as React from "react";
import { StepDragger } from "../../draggable/step_dragger";
import { Step } from "../interfaces";
import { pushStep } from "../actions";

interface StepButtonParams {
    step: Step;
    dispatch: Function;
    children?: JSX.Element | undefined;
    color: string;
}
// let dragStep = (dispatch: Function, step: Step, cssClass: string) =>
//     (ev: React.DragEvent) => {
//         addGhostImage(ev, "step-drag-ghost-image");
//         dispatch(stepPut(step, ev));
//     };

let click = (dispatch: Function, step: Step) =>
    (event: React.FormEvent) => { dispatch(pushStep(step)); };

export function StepButton({ children, step, color, dispatch}: StepButtonParams) {
    return <div className="col-xs-6">
        <div className="block-wrapper">
            <StepDragger dispatch={dispatch} step={step} ghostCss={"step-drag-ghost-image"}>
                <button className={
                    `full-width text-left ${color}-block block-header block`
                }
                    onClick={click(dispatch, step)}>
                    {children}
                    <i className="fa fa-arrows block-control" />
                </button>
            </StepDragger>
        </div>
    </div >;
}