import * as React from "react";
import { GardenPlantProps, GardenPlantState } from "../interfaces";
import { cachedIcon, DEFAULT_ICON } from "../../open_farm/index";
import { history } from "../../history";

const SCALE_FACTOR = 9.8;

export class GardenPlant extends React.Component<GardenPlantProps, Partial<GardenPlantState>> {
  constructor() {
    super();
    this.state = { icon: DEFAULT_ICON, isDragging: false, transX: 0, transY: 0 };
  }

  componentDidMount() {
    let OFS = this.props.plant.body.openfarm_slug;
    cachedIcon(OFS).then(icon => this.setState({ icon }));
  }

  select = () => {
    let hasID = !!this.props.plant.body.id;
    let editing = history.getCurrentLocation().pathname.includes("edit");
    if (hasID && editing) { this.setState({ isDragging: true }); }
  }

  drag = (e: React.MouseEvent<SVGElement>) => {
    if (this.props.selected && this.state.isDragging) {
      let { id } = this.props.plant.body;
      let deltaX = e.pageX - (this.state.transX || e.pageX);
      let deltaY = e.pageY - (this.state.transY || e.pageY);

      this.setState({ transX: e.pageX, transY: e.pageY });

      id && this.props.onUpdate(deltaX, deltaY, id);
    }
  }

  render() {
    let { radius, x, y, id } = this.props.plant.body;
    let isEditing = history.getCurrentLocation().pathname.includes("" + id);
    let isSelected = this.props.selected;
    let offsetX = x + radius;
    let offsetY = y + radius;
    let { isDragging } = this.state;
    return <g>

      {isSelected && (
        <circle
          className={"plant-indicator is-chosen-" + !!isSelected}
          cx={offsetX}
          cy={offsetY}
          r={radius}
          stroke="green"
          strokeWidth={4}
          strokeDasharray={8}
          fill="none"
        />
      )}

      {isSelected && isDragging && (
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
        className={"plant-image is-chosen-" + isSelected}
        href={this.state.icon}
        onClick={() => { this.props.onClick(this.props.plant.uuid); }}
        height={radius * 2}
        width={radius * 2}
        x={x}
        y={y}
        onMouseMove={this.drag}
        onMouseDown={this.select} />
    </g>
  }
}
