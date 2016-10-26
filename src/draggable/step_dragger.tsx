import { addGhostImage } from "./add_ghost_image";
import * as React from "react";
import { stepPut } from "./actions";
import { Step } from "../sequences/interfaces";
import { DataXferIntent } from "./interfaces";

/** This is an event handler that:
 * 1. Adds an optional CSS class to the dragged "ghost image".
 * 2. Puts the step into the Redux store (and the drag event's dataTransfer)
 *    so that it can be pulled up when the "drop" event happens.
 * Example usage:
 *
 * <button draggable={true}
 *         onDragStart={stepDragEventHandler(dispatch, step, "optnl-stuff")} >
 *   Drag this!
 * </button>
 * */
export let stepDragEventHandler = (dispatch: Function,
    step: Step,
    ghostCss = "",
    intent: DataXferIntent) =>
    (ev: React.DragEvent) => {
        addGhostImage(ev, ghostCss);
        dispatch(stepPut(step, ev, intent));
    };

interface StepDraggerProps {
    dispatch: Function;
    step: Step;
    intent: DataXferIntent;
    ghostCss: string;
    children?: JSX.Element | undefined;
}

export function StepDragger({dispatch,
    step,
    children,
    ghostCss,
    intent}: StepDraggerProps) {
    return <div draggable={true}
        onDragStart={stepDragEventHandler(dispatch,
            step,
            ghostCss,
            intent)} >
        {children}
    </div>;
}
