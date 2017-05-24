import * as React from "react";
import { GardenPlantProps, GardenPlantState } from "../interfaces";
import { cachedIcon, DEFAULT_ICON } from "../../open_farm/index";
import { Circle } from "./circle";
import { round, scale } from "./util";

export class GardenPlant
  extends React.Component<GardenPlantProps, Partial<GardenPlantState>> {
  constructor() {
    super();
    this.state = { icon: DEFAULT_ICON };
  }

  componentDidMount() {
    let OFS = this.props.plant.body.openfarm_slug;
    cachedIcon(OFS).then(icon => this.setState({ icon }));
  }

  render() {
    let { dragging, selected, plant, showSpread, onClick } = this.props;
    let { radius, x, y } = plant.body;
    let offsetX = x + radius;
    let offsetY = y + radius;

    return <g>
      <Circle
        className={"plant-indicator"}
        x={offsetX}
        y={offsetY}
        r={radius}
        selected={selected}
      />

      {((selected && dragging) || showSpread) && (
        <circle
          cx={round(offsetX)}
          cy={round(offsetY)}
          r={scale(radius)}
          fillOpacity={0.2}
          fill={"green"}
          stroke={"green"}
          strokeWidth={"1.5"}
        />
      )}

      <image
        className={"plant-image is-chosen-" + selected}
        href={this.state.icon}
        onClick={() => onClick(this.props.plant)}
        height={radius * 2}
        width={radius * 2}
        x={round(x)}
        y={round(y)}
      />
    </g>
  }
}
