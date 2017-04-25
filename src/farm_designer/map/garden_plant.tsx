import * as React from "react";
import { GardenPlantProps, GardenPlantState } from "../interfaces";
import { cachedIcon, DEFAULT_ICON } from "../../open_farm/index";
import { history } from "../../history";

const SCALE_FACTOR = 9.8;

export class GardenPlant extends React.Component<GardenPlantProps,
  Partial<GardenPlantState>> {

  state = { icon: DEFAULT_ICON, isDragging: false, transX: 0, transY: 0 };

  componentDidMount() {
    let OFS = this.props.plant.body.openfarm_slug;
    cachedIcon(OFS).then(icon => this.setState({ icon }));
    document.body.addEventListener("mouseup", this.deSelect);
    document.body.addEventListener("mousemove", this.drag);
  }

  componentWillUnmount() {
    // Avoid memory leaks!
    document.body.removeEventListener("mouseup", this.deSelect);
    document.body.removeEventListener("mousemove", this.drag);
  }

  select = () => {
    let hasID = !!this.props.plant.body.id;
    let editing = history.getCurrentLocation().pathname.includes("edit");
    if (hasID && editing) { this.setState({ isDragging: true }); }
  }

  deSelect = () => {
    this.props.onDrop(this.props.plant.uuid);
    this.setState({ isDragging: false });
  }

  drag = (e: MouseEvent) => {
    if (this.state.isDragging) {
      let { id } = this.props.plant.body;
      let deltaX = e.pageX - (this.state.transX || e.pageX);
      let deltaY = e.pageY - (this.state.transY || e.pageY);

      this.setState({
        transX: e.pageX,
        transY: e.pageY
      });

      id && this.props.onUpdate(deltaX, deltaY, id);
    }
  }

  render() {
    let { radius, x, y, id } = this.props.plant.body;
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
            r={(radius || 0) * SCALE_FACTOR / 2}
            fillOpacity={0.2}
            fill="green"
            stroke="green"
            strokeWidth="1.5" />

          <circle
            cx={offsetX}
            cy={offsetY}
            r={(radius || 0) * SCALE_FACTOR / 2}
            fill="none"
            stroke="green"
            strokeWidth="1.5" />
        </g>
      )}

      <image
        className={"plant-image is-chosen-" + !!isChosen}
        href={this.state.icon}
        height={radius * 2}
        width={radius * 2}
        x={x}
        y={y}
        onMouseDown={this.select} />
    </g>
  }
}
