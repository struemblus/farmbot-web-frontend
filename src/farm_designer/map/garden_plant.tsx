import * as React from "react";
import { DraggableSvgImage } from "../draggable_svg_image";
import { GardenPlantProps, GardenPlantState } from "../interfaces";
import { cachedIcon, DEFAULT_ICON } from "../../open_farm/index";

export class GardenPlant extends React.Component<GardenPlantProps, GardenPlantState> {

  state = { icon: DEFAULT_ICON };

  componentDidMount() {
    cachedIcon(this.props.plant.body.openfarm_slug)
      .then((icon: string) => this.setState({ icon }));
  }

  render() {
    let { plant, onUpdate, onDrop, crop } = this.props;
    if (plant.body.id) {
      return <g>

        {/*<defs>
        <pattern id="active-grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="green" strokeWidth="0.5" />
        </pattern>
      </defs>

      <circle className="map-plant-spread"
          cx={plant.body.x}
          cy={plant.body.y}
          r={(r || 0) * 10 / 2} />

        <g className="selected-plant-indicator">
          <circle
            cx={plant.body.x}
            cy={plant.body.y}
            strokeWidth={3}
            fill="none"
            stroke="green"
            strokeDasharray={8}
            r={plant.body.radius} 
            transform={translation}
            />
        </g>

      {this.state.isDragging && (
        <g>
          <circle cx={offsetX} cy={offsetY} transform={translation}
            r={(r || 0) * 9.8 / 2} fill="none" stroke="green" strokeWidth="1.5" />
          <circle r={(r || 0) * 9.8 / 2} transform={translation}
            fill={"url(#active-grid)"} cx={offsetX} cy={offsetY} />
        </g>
      )}*/}

        <DraggableSvgImage
          crop={crop}
          key={plant.body.id}
          plant={plant}
          x={plant.body.x - plant.body.radius}
          y={plant.body.y - plant.body.radius}
          height={plant.body.radius * 2}
          width={plant.body.radius * 2}
          id={plant.body.id}
          onUpdate={onUpdate}
          onDrop={onDrop}
          href={this.state.icon} />

      </g>;
    } else {
      throw new Error("Save plants before placing them on the map.");
    }
  }
}
