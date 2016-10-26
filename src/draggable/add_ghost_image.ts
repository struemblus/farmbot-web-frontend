import * as React from "react";

/** Creates a "ghost image" for a React element while it is dragged.
 * Returns HTMLDOMElement of the ghost image
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
