import { DropAreaProps, DropAreaState } from "./interfaces";
import { stepGet } from "./actions";
import * as React from "react";
import { t } from "i18next";

/** Style rules for the drop area when it is not dragged over. */
const INVISIBLE_STYLE = {
    width: "100%",
    height: "2px",
    zIndex: 10,
    position: "relative"
};

export class DropArea extends React.Component<DropAreaProps, DropAreaState> {
    constructor() {
        super();
        this.state = {
            isHovered: false
        };
    }

    dragOver(event: React.DragEvent) {
        console.log("Dragover");
        event.preventDefault();
    }

    drop(event: React.DragEvent) {
        console.log("Drop");
        event.preventDefault();
        let key = event.dataTransfer.getData("text");
        let fn = this.props.callback;
        if (fn) { fn(key); }
        this.toggle();
    }

    toggle() {
        console.log("Toggle");
        this.setState({ isHovered: !this.state.isHovered });
    }

    visible() {
        return <div className="drag-drop-area padding"
            onDragOver={this.dragOver.bind(this)}
            onDrop={this.drop.bind(this)}>
            {this.props.children}
        </div>;
    }

    hidden() {
        //     return <div style={INVISIBLE_STYLE}
        //         onDragLeave={this.toggle.bind(this)}
        //         onDragEnter={this.toggle.bind(this)}
        //         onDragOver={this.dragOver.bind(this)}>
        //         WHatever </div>;
        return <div style={INVISIBLE_STYLE}></div>;
    }

    render() {
        let isVisible = this.props.isLocked || this.state.isHovered;

        return <div onDragLeave={this.toggle.bind(this)}
            onDragEnter={this.toggle.bind(this)}>
            {isVisible ? this.visible() : this.hidden()}
        </div>;
    }
}
