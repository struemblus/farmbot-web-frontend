// export class DropArea extends React.Component<DropAreaProps, DropAreaState> {
//     constructor() {
//         super();
//         this.state = {
//             isHovered: false
//         };
//     }

//     toggle() {
//         this.setState({ isHovered: !this.state.isHovered });
//     }

//     dragOver(event: React.DragEvent) {
//         event.preventDefault();
//         this.toggle();
//     }

//     drop(event: React.DragEvent) {
//         event.preventDefault();
//         console.log("?????");
//         if (this.props.onDrop) {
//             console.log("?????");
//             this.props.onDrop(event.dataTransfer.getData("text"));
//         }
//     }

//     render() {
//         let isVisible = this.props.isLocked || this.state.isHovered;
//         if (isVisible) {
//             return <div className="drag-drop-area padding"
//                 onDrop={this.drop.bind(this)}
//                 onDragLeave={this.toggle.bind(this)}>
//                 {this.props.children}
//             </div>;
//         } else {
//             return <div style={INVISIBLE_STYLE}
//                 onDragOver={this.dragOver.bind(this)} />;
//         }
//     }
// }

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
        event.preventDefault();
    }

    drop(event: React.DragEvent) {
        event.preventDefault();
        console.log("Drawwwp");
        let key = event.dataTransfer.getData("text");
        let fn = this.props.callback;
        if (fn) { fn(key); }
    }

    toggle() {
        this.setState({ isHovered: !this.state.isHovered });
    }

    render() {
        let isVisible = this.props.isLocked || this.state.isHovered;
        // return <div className="drag-drop-area padding"
        //     onDragOver={preventDefault}
        //     onDrop={this.drop.bind(this)}
        //     hidden={!isVisible}>
        //     {this.props.children}
        // </div>;

        if (isVisible) {
            return <div className="drag-drop-area padding"
                onDragEnter={this.toggle.bind(this)}
                onDragLeave={this.toggle.bind(this)}>
                {this.props.children}
            </div>;
        } else {
            return <div style={INVISIBLE_STYLE}
                onDragLeave={this.toggle.bind(this)}
                onDragEnter={this.toggle.bind(this)}
                onDragOver={this.dragOver.bind(this)} />;
        }

    }
}
