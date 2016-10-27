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

let click = (dispatch: Function, step: Step) =>
    (event: React.FormEvent) => { dispatch(pushStep(step)); };

export function StepButton({ children, step, color, dispatch}: StepButtonParams) {
    return <div className="col-xs-6">
        <div className="block-wrapper">
            <StepDragger dispatch={dispatch}
                step={step}
                ghostCss="step-drag-ghost-image"
                intent="step_splice"
                draggerId={0xCAFEF00D}>
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