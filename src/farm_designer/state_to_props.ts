import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import {
  selectAllGenericPointers,
  selectAllPlantPointers,
  selectAllCrops,
  selectAllToolSlotPointers
} from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {
  let plants = selectAllPlantPointers(props.resources.index);
  let selectedPlant = plants
    .filter(x => x.uuid === props.resources.consumers.farm_designer.selectedPlant)[0];
  return {
    crops: selectAllCrops(props.resources.index),
    dispatch: props.dispatch,
    selectedPlant,
    designer: props.resources.consumers.farm_designer,
    points: selectAllGenericPointers(props.resources.index),
    toolSlots: selectAllToolSlotPointers(props.resources.index),
    plants
  };
}
