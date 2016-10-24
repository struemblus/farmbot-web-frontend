import * as React from "react";
import { nastyStorargeSet } from "../../util"
interface StepButtonParams {
    onClick: React.EventHandler<React.MouseEvent> | undefined;
    children?: JSX.Element | undefined;
    color: string;
}

function badRef() { console.warn("Something went wrong with drag n drop."); }
export function StepButton({children, onClick, color}: StepButtonParams) {
    let classes = `full-width text-left ${color}-block block-header block`;

    function undrag(ev: React.DragEvent) {
        document.querySelector("#temp-drag-and-drop").remove();
    }

    function drag(ev: React.DragEvent) {
        let key = nastyStorargeSet(onClick || badRef);
        var el = (ev.target as HTMLElement).cloneNode(true) as HTMLElement;
        el.classList.add("hey-rory");
        el.style.top = "-99999px";
        el.id = "temp-drag-and-drop";
        document.body.appendChild(el);
        (ev.dataTransfer as any).setDragImage(el, 0, 0);
        ev.dataTransfer.setData("text", key);
    }

    return <div className="col-xs-6">
        <div className="block-wrapper">
            <button className={classes}
                onClick={onClick}
                onDragStart={drag}
                onDragEnd={undrag}
                draggable={true}>
                {children}
                <i className="fa fa-arrows block-control" />
            </button>
        </div>
    </div >;
}