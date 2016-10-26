import * as React from "react";
import { dragTheStep } from "../../draggable/drag_the_step";
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
            <button className={
                `full-width text-left ${color}-block block-header block`
            }
                onClick={click(dispatch, step)}
                onDragStart={dragTheStep(dispatch, step, "step-drag-ghost-image")}
                draggable={true}>
                {children}
                <i className="fa fa-arrows block-control" />
            </button>
        </div>
    </div >;
}