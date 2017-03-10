import * as React from "react";
import { DraggableSvgImage } from "../draggable_svg_image";
import { Plant } from "../interfaces";
import * as Axios from "axios";
import { cachedIcon, DEFAULT_ICON } from "../../open_farm/index";

interface Props {
  plant: Plant;
  onUpdate: (deltaX: number, deltaY: number, idx: number) => void;
  onDrop: (id: number) => void;
}

export class GardenPlant extends React.Component<Props, { icon: string }> {
  constructor() {
    super();
    this.state = {
      icon: DEFAULT_ICON
    };
  }

  componentDidMount() {
    cachedIcon(this.props.plant.openfarm_slug)
      .then((icon: string) => this.setState({ icon }));
  }
  render() {
    let { plant, onUpdate, onDrop } = this.props;
    if (plant.id) {
      return <DraggableSvgImage key={plant.id}
        x={plant.x}
        y={plant.y}
        height={32}
        width={32}
        id={plant.id}
        onUpdate={onUpdate}
        onDrop={onDrop}
        href={this.state.icon} />;
    } else {
      throw new Error("Save plants before placing them on the map");
    }
  }
}
