import * as React from "react";
import { nastyStorargeSet } from "../../util";
import { addGhostImage } from "../draggable/index";

interface StepButtonParams {
    onClick: React.EventHandler<React.MouseEvent> | undefined;
    children?: JSX.Element | undefined;
    color: string;
}

function badRef() { console.warn("Something went wrong with drag n drop."); }
export function StepButton({children, onClick, color}: StepButtonParams) {
    let classes = `full-width text-left ${color}-block block-header block`;

    function undrag(ev: React.DragEvent) {
        (ev.target as HTMLElement).classList.remove("hey-rory");
    }

    function drag(ev: React.DragEvent) {
        let key = nastyStorargeSet(onClick || badRef);
        addGhostImage(ev, "step-drag-ghost-image");
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