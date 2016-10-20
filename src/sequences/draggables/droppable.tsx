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
