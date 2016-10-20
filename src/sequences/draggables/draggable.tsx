// import * as React from "react";
// import { t } from "i18next";

// interface DraggableState {
//     isDragging?: boolean;
//     style?: {
//         position?: string;
//         top?: string;
//         left?: string;
//     };
// }

// interface DragableProps {
//     children?: JSX.Element;
// }

// export class Dragable extends React.Component<DragableProps, DraggableState> {
//     constructor() {
//         super();
//         this.state = { style: {}, isDragging: false };
//     }

//     toggleDragState() {
//         console.log("Toggle drag state to " + JSON.stringify(!this.state.isDragging));
//         this.setState({ isDragging: !this.state.isDragging });
//     }

//     didMove(e: React.MouseEvent) {
//         if (!this.state.isDragging) { return; };
//         console.log("UNREACHABLE?!?!")
//         this.setState({
//             style: {
//                 position: "absolute",
//                 top: ((e.clientY + 60) + "px"),
//                 left: (e.clientX + "px")
//             }
//         });
//     }

//     render() {
//         let Wow = 
//         return <div draggable={true}
//             style={this.state.style}>
//             {this.props.children}
//         </div>;
//     }
// }
