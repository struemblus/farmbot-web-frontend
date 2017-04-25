import * as React from "react";
import { GardenPlantProps, GardenPlantState } from "../interfaces";
import { cachedIcon, DEFAULT_ICON } from "../../open_farm/index";
import { history } from "../../history";

export class GardenPlant extends React.Component<GardenPlantProps,
  Partial<GardenPlantState>> {

  state = { icon: DEFAULT_ICON, isDragging: false, transX: 0, transY: 0 };

  componentDidMount() {
    let OFS = this.props.plant.body.openfarm_slug;
    cachedIcon(OFS).then(icon => this.setState({ icon }));
    document.onmousemove = this.drag;
  }

  select = () => {
    let plantId = this.props.plant.body.id || "";
    if (history.getCurrentLocation().pathname
      // TS doesn't like that the id is a number for the .includes() method
      .includes((plantId as string) && "edit")) {
      this.setState({ isDragging: true });
    }
  }

  deSelect = () => {
    (this.props.onDrop)("")
    this.setState({ isDragging: false });
  }

  snap = (value: number, gridSize: number) => {
    let snapped = gridSize * Math.round(value / gridSize);
    if (Math.abs(value - snapped) < 2) { return snapped; }
  }

  drag = (e: any) => {
    let { radius, id, x, y } = this.props.plant.body;
    if (this.state.isDragging) {
      // TODO: Use offsets of where element is initially selected instead of
      // hard-coded values.
      let coordX = (e.pageX - radius) - (320 + x);
      let coordY = (e.pageY - radius) - (110 + y);

      let gridSize = 10;
      let snappedX = this.snap(coordX, gridSize);
      let snappedY = this.snap(coordY, gridSize);

      if (snappedX) { this.setState({ transX: snappedX }); }
      if (snappedY) { this.setState({ transY: snappedY }); }

      id && this.props.onUpdate(this.state.transX, this.state.transY, id);
    }
  }

  render() {
    let { radius, x, y, id, spread } = this.props.plant.body;
    let plantId = (id || "NO_PLANT_ID_FOUND").toString();
    let isChosen = history.getCurrentLocation().pathname.includes(plantId);
    let offsetX = x + radius;
    let offsetY = y + radius;
    let { isDragging } = this.state;

    return <g>

      {isChosen && (
        <circle
          className={"plant-indicator is-chosen-" + !!isChosen}
          cx={offsetX}
          cy={offsetY}
          r={radius}
          stroke="green"
          strokeWidth={4}
          strokeDasharray={8}
          fill="none"
        />
      )}

      {isChosen && isDragging && (
        <g>
          <circle
            cx={offsetX}
            cy={offsetY}
            r={(radius || 0) * 9.8 / 2}
            fillOpacity={0.2}
            fill="green"
            stroke="green"
            strokeWidth="1.5"
          />

          <circle
            cx={offsetX}
            cy={offsetY}
            r={(radius || 0) * 9.8 / 2}
            fill="none"
            stroke="green"
            strokeWidth="1.5"
          />
        </g>
      )}

      <image
        className={"plant-image is-chosen-" + !!isChosen}
        href={this.state.icon}
        height={radius * 2}
        width={radius * 2}
        x={x}
        y={y}
        onMouseDown={() => this.select()}
        onMouseUp={() => this.deSelect()}
        onMouseMove={(e) => this.drag(e)}
      />

    </g>
  }
}
