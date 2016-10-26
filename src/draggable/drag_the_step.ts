import { addGhostImage } from "./add_ghost_image";
import * as React from "react";
import { stepPut } from "./actions";
import { Step } from "../sequences/interfaces";

/** This is an event handler that:
 * 1. Adds an optional CSS class to the dragged "ghost image".
 * 2. Puts the step into the Redux store (and the drag event's dataTransfer)
 *    so that it can be pulled up when the "drop" event happens.
 * Example usage:
 *
 * <button draggable={true}
 *         onDragStart={dragTheStep(dispatch, step, "optnl-stuff")} >
 *   Drag this!
 * </button>
 * */
export let dragTheStep = (dispatch: Function, step: Step, cssClass = "") =>
    (ev: React.DragEvent) => {
        addGhostImage(ev, cssClass);
        dispatch(stepPut(step, ev));
    };
