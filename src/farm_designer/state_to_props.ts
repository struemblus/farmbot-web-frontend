import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import {
  selectAllPoints,
  selectAllPlants,
  selectAllCrops
} from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {
  let plants = selectAllPlants(props.resources.index);
  let selectedPlant = plants
    .filter(x => x.uuid === props.resources.consumers.farm_designer.selectedPlant)[0];
  return {
    crops: selectAllCrops(props.resources.index),
    dispatch: props.dispatch,
    selectedPlant,
    designer: props.resources.consumers.farm_designer,
    points: selectAllPoints(props.resources.index),
    plants
  };
}
