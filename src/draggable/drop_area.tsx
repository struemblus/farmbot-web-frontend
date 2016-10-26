import { DropAreaProps, DropAreaState } from "./interfaces";
import { stepGet } from "./actions";
import * as React from "react";
import { t } from "i18next";

/** Style rules for the drop area when it is not dragged over. */
const INVISIBLE_STYLE = {
    width: "100%",
    height: "50px"
};

export class DropArea extends React.Component<DropAreaProps, DropAreaState> {
    constructor() {
        super();
        this.state = {
            isHovered: false
        };
    }

    dragOver(event: any) {
        console.log("Dragover");
        event.preventDefault();
    }

    drop(event: React.DragEvent) {
        console.log("Drop");
        event.preventDefault();
        let key = event.dataTransfer.getData("text");
        let fn = this.props.callback;
        if (fn) { fn(key); }
    }

    toggle() {
        console.log("Toggle");
        this.setState({ isHovered: !this.state.isHovered });
    }

    render() {
        let isVisible = this.props.isLocked || this.state.isHovered;

        if (true/*isVisible*/) {
            return <div className="drag-drop-area padding"
                onDragOver={this.dragOver.bind(this)}
                onDrop={this.drop.bind(this)}>
                {this.props.children}
            </div>;
        } else {
            //     return <div style={INVISIBLE_STYLE}
            //         onDragLeave={this.toggle.bind(this)}
            //         onDragEnter={this.toggle.bind(this)}
            //         onDragOver={this.dragOver.bind(this)}>
            //         WHatever </div>;
            return <div />;
        }

    }
}
