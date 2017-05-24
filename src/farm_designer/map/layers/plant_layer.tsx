import * as React from "react";
import { TaggedPlantPointer } from "../../../resources/tagged_resources";
import { GardenPlant } from "../garden_plant";
import { Link } from "react-router";
import * as _ from "lodash";
interface PlantLayerProps {
  plants: TaggedPlantPointer[];
  visible: boolean;
}

export function PlantLayer({ plants, visible }: PlantLayerProps) {
  if (visible) {
    return <g>{plants
      .filter(x => !!x.body.id)
      .map((p, index) => {
        let plantId = (p.body.id || "ERR_NO_PLANT_ID").toString();
        let currentPlant = this.getPlant();
        let selected = !!(currentPlant && (p.uuid === currentPlant.uuid));

        return <Link className={"plant-link-wrapper"}
          to={"/app/designer/plants/" + plantId}
          id={plantId || "NOT_SAVED"}
          onClick={_.noop}
          key={(plantId || index)}>
          <GardenPlant
            plant={p}
            selected={selected}
            showSpread={this.props.showSpread}
            dragging={selected && !!this.state.isDragging && this.isEditing}
            onClick={plant => {
              this
                .props
                .dispatch({ type: "SELECT_PLANT", payload: plant.uuid });
            }}
          />
        </Link>;
      })}</g>
  } else {
    return <g />;
  }
}
