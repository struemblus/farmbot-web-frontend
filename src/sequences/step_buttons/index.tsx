import * as React from "react";
import { addGhostImage } from "../../draggable/add_ghost_image";
import { Step } from "../interfaces";
import { stepPut } from "../../draggable/actions";
import { pushStep } from "../actions";

interface StepButtonParams {
    step: Step;
    dispatch: Function;
    children?: JSX.Element | undefined;
    color: string;
}

let drag = (dispatch: Function, step: Step) =>
    (ev: React.DragEvent) => {
        addGhostImage(ev, "step-drag-ghost-image");
        dispatch(stepPut(step, ev));
    };

let click = (dispatch: Function, step: Step) =>
    (event: React.FormEvent) => { dispatch(pushStep(step)); };

function badRef() { console.warn("Something went wrong with drag n drop."); }

export function StepButton({ children, step, color, dispatch}: StepButtonParams) {
    return <div className="col-xs-6">
        <div className="block-wrapper">
            <button className={
                `full-width text-left ${color}-block block-header block`
            }
                onClick={click(dispatch, step)}
                onDragStart={drag(dispatch, step)}
                draggable={true}>
                {children}
                <i className="fa fa-arrows block-control" />
            </button>
        </div>
    </div >;
}