import * as React from "react";
import { DraggableSvgImageProps, DraggableSvgImageState } from "./interfaces";
import { history } from "../history";

export class DraggableSvgImage extends React.Component<DraggableSvgImageProps,
  Partial<DraggableSvgImageState>> {
  state = { isDragging: false, transX: 0, transY: 0 };

  select = () => {
    let plantId = this.props.plant.body.id || "";
    if (history
    .getCurrentLocation()
    .pathname
    // TS doesn't like that the id is a number for the .includes() method
    .includes((plantId as string) && "edit")) {
      this.setState({ isDragging: true });
    }
  }

  deSelect = () => {
    (this.props.onDrop)("")
    this.setState({ isDragging: false });
  };

  snap = (value: number, gridSize: number) => {
    // let snapped = gridSize * Math.round(value / gridSize);
    // if (Math.abs(value - snapped) < 2) { return snapped; }
  }

  drag = (e: React.MouseEvent<SVGElement>) => {
    if (this.state.isDragging) {
    //   // TODO: Use offsets of where element is initially selected instead of
    //   // hard-coded values (and do some mathematical cleanup).
      let coordX = ((e.pageX - (this.props.height / 2)) - (320 + this.props.x));
      let coordY = ((e.pageY - (this.props.width / 2)) - (110 + this.props.y));

      let gridSize = 10;
      let snappedX = this.snap(coordX, gridSize);
      let snappedY = this.snap(coordY, gridSize);

      if (snappedX) { this.setState({ transX: snappedX }); }
      if (snappedY) { this.setState({ transY: snappedY }); }

      let idx = this.props.id;
      this.props.onUpdate(snappedX || coordX, snappedY || coordY, idx);
    }
  }

  render() {
    return <image
        x={this.props.x}
        y={this.props.y}
        href={this.props.href}
        height={this.props.height}
        width={this.props.width}
        onMouseDown={() => this.select()}
        onMouseUp={() => this.deSelect()}
        onMouseMove={(e) => this.drag(e)} />
  }
};
