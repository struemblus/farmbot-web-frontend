import * as React from "react";
import { TaggedPlantPointer } from "../../../resources/tagged_resources";
import { GardenPlant } from "../garden_plant";
import { Link } from "react-router";
import * as _ from "lodash";
interface PlantLayerProps {
  plants: TaggedPlantPointer[];
  currentPlant: TaggedPlantPointer | undefined;
  dragging: boolean;
  editing: boolean;
  visible: boolean;
  temporaryShowSpread: boolean;
  dispatch: Function;
}

export function PlantLayer(p: PlantLayerProps) {
  let { plants, dispatch, visible, currentPlant, dragging, editing, temporaryShowSpread } = p;

  if (visible) {
    return <g>{plants
      .filter(x => !!x.body.id)
      .map(p => {
        return {
          selected: !!(currentPlant && (p.uuid === currentPlant.uuid)),
          plantId: (p.body.id || "IMPOSSIBLE_ERR_NO_PLANT_ID").toString(),
          uuid: p.uuid,
          plant: p
        }
      })
      .map((props, index) => {
        let action = { type: "SELECT_PLANT", payload: props.uuid };
        return <Link className="plant-link-wrapper"
          to={"/app/designer/plants/" + props.plantId}
          id={props.plantId}
          onClick={_.noop}
          key={props.plantId}>
          <GardenPlant
            plant={props.plant}
            selected={props.selected}
            showSpread={temporaryShowSpread}
            dragging={props.selected && dragging && editing}
            onClick={() => dispatch(action)}
          />
        </Link>;
      })}</g>
  } else {
    return <g />;
  }
}
