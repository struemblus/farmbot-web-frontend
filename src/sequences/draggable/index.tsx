import * as React from "react";
import { t } from "i18next";
import { nastyStorargeGet } from "../../util"

interface DropableProps {
    isLocked?: boolean;
}

interface DropableState {
    isHovered: boolean;
}

function preventDefault(event: any) {
    event.preventDefault();
}

function drop(event: React.DragEvent) {
    event.preventDefault();
    let key = event.dataTransfer.getData("text");
    nastyStorargeGet(key)();
}

export class Droppable extends React.Component<DropableProps, DropableState> {
    constructor() {
        super();
        this.state = {
            isHovered: false
        };
    }
    render() {
        let isVisible = this.props.isLocked || this.state.isHovered;
        return <div className="drag-drop-area padding"
            onDragOver={preventDefault}
            onDrop={drop}
            hidden={!isVisible}>
            {this.props.children}
        </div>;
    }
}

/** Creates a "ghost image" for a React element whil it is dragged.
 * Returns a function that will 
 */
export function addGhostImage(
    /** Drag event created by onDragStart() */
    ev: React.DragEvent,
    /** Optional CSS class to add to drag image. */
    cssClass = "") {
    var el = (ev.target as HTMLElement).cloneNode(true) as HTMLElement;
    // RELEVANT READING:
    // http://www.kryogenix.org/code/browser/custom-drag-image.html
    el.classList.add(cssClass);
    el.style.top = "-150px";
    el.style.position = "absolute";
    el.ondragend = el.remove;
    document.body.appendChild(el);
    // TS doesn't seem to recognize this member on ev.dataTransfer...
    (ev.dataTransfer as any).setDragImage(el, 0, 0);
    return el;
}
