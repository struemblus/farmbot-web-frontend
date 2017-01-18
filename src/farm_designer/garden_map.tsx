import * as React from "react";
// import { push } from "../history";
import { browserHistory } from "react-router";
import { ICONS } from "./icons";
import { Everything } from "../interfaces";
import { Plant } from "./interfaces";
import { t } from "i18next";

interface MapPointProps extends Everything {
  plant: Plant;
  icon: string;
  selected: boolean;
}

export class MapPoint extends React.Component<MapPointProps, any> {
  select() {
    let p1 = this.props.location.query["p1"] || "PlantInfo";
    // Need to use OPENFARM SLUG, *not* UUID!
    let url = `/app/designer?p1=${p1}&id=${this.props.plant.openfarm_slug || "OOPS"}`;
    browserHistory.push(url);
  }

  render() {
    let length = this.props.designer.y_size, height = 96, width = 96;
    return <image xlinkHref={this.props.icon}
      x={this.props.plant.x - (width / 2)}
      y={((-1 * this.props.plant.y) + length) - (height / 2)}
      height={`${height}px`}
      onClick={this.select.bind(this)}
      width={`${width}px`} />;
  }
};

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
