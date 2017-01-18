import * as React from "react";
import { Everything } from "../interfaces";

export class GardenMap extends React.Component<Everything, any> {
  dragover_handler(ev: any) {
    // Perform drop availability here probably
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
  }

  drop_handler(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }

  componentDidMount() {
    document.addEventListener("drop", function (e) {
      e = e || window.event;
      var dragX = e.pageX, dragY = e.pageY;
      console.log("X: " + dragX + " Y: " + dragY);
    }, false);
  }

  render() {
    return <div className="drop-area"
      id="drop-area"
      onDrop={this.drop_handler}
      onDragEnter={this.dragover_handler}
      onDragOver={this.dragover_handler}>
    </div>;
  }
}
