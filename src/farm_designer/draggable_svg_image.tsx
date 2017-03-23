import * as React from "react";
import { DraggableSvgImageProps, DraggableSvgImageState } from "./interfaces";

export class DraggableSvgImage extends React.Component<DraggableSvgImageProps,
  Partial<DraggableSvgImageState>> {
  constructor() {
    super();
    this.state = { isDragging: false, transX: 0, transY: 0 };
  }

  select = () => this.setState({isDragging: true});

  deSelect = () => this.setState({isDragging: false});

  snap = (value: number, gridSize: number) => {
    let snapped = gridSize * Math.round(value / gridSize);
    if (Math.abs(value - snapped) < 2) { return snapped; }
  }

  drag = (e: React.MouseEvent<SVGElement>) => {
    if (this.state.isDragging) {
      // TODO: Use offsets of where element is initially selected instead of
      // hard-coded values (and do some mathematical cleanup).
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
    let { height, width, x, y } = this.props;
    let offsetX = x - (height * 0.1);
    let offsetY = y - (width * 0.1);
    let offsetH = height * 1.2;
    let offsetW = width * 1.2;
    let translation = `translate(${this.state.transX}, ${this.state.transY})`;
    return <g>

      <defs>
        <pattern id="active-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="green" strokeWidth="0.5" />
        </pattern>
      </defs>

      {this.state.isDragging && (
        <g>
          <rect x={offsetX} y={offsetY} transform={translation} height={offsetH}
            width={offsetW} fill="none" stroke="green" strokeWidth="1.5" />
          <rect height={offsetH} width={offsetW} transform={translation}
            fill={"url(#active-grid)"} x={offsetX} y={offsetY} />
        </g>
      )}

      <image className="handle"
        x={this.props.x}
        y={this.props.y}
        href={this.props.href}
        height={this.props.height}
        width={this.props.width}
        transform={translation}
        onMouseDown={() => this.select()}
        onMouseUp={() => this.deSelect()}
        onMouseMove={(e) => this.drag(e)} />

    </g>;
  }
};
