import { Everything } from "../interfaces";
import { Props } from "./interfaces";
import {
  selectAllPoints,
  selectAllPlants,
  selectAllCrops
} from "../resources/selectors";

export function mapStateToProps(props: Everything): Props {

  return {
    crops: selectAllCrops(props.resources.index),
    dispatch: props.dispatch,
    designer: props.resources.consumers.farm_designer,
    points: selectAllPoints(props.resources.index),
    plants: selectAllPlants(props.resources.index)
  };
}
