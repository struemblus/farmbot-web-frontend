import * as Axios from "axios";
import { error } from "../ui";
import { Plant } from "./interfaces";
import { Thunk, ReduxAction } from "../redux/interfaces";
import { CropSearchResult, OpenFarm } from "./openfarm";
import { t } from "i18next";
import * as _ from "lodash";
import { API } from "../api";

let url = (q: string) => `${OpenFarm.cropUrl}?include=pictures&filter=${q}`;
let _plantSearch = _.throttle((q: string) => Axios.get<CropSearchResult>(url(q)), 1500);

export function searchPlants(event: any): Thunk {
  return (dispatch, getState) => {
    _plantSearch(event)
      .then(resp => {
        console.log(resp);
      }, (e: Error) => {
        // error(prettyPrintApiErrors(e));
      });
  };
}

export function savePlant(plant: Plant, baseUrl: string): Thunk {
  let url = API.current.plantsPath;
  return function (dispatch, getState) {
    dispatch({ type: "SAVE_PLANT_START" });
    return Axios.post<Plant>(url, plant)
      .then((resp) => {
        // so that no persisted data sticks around.
        let payload: Plant = _.assign({}, plant, resp.data) as Plant;
        dispatch({ type: "SAVE_PLANT_OK", payload });
      })
      .catch((payload) => {
        error(t("Tried to save plant, but couldn't."));
        dispatch({ type: "SAVE_PLANT_ERR", payload });
      });
  };
};

export function destroyPlant(plant: Plant, baseUrl: string): Thunk {
  let url = API.current.plantsPath + plant.id;
  return function (dispatch, getState) {
    dispatch({ type: "DESTROY_PLANT_START" });
    return Axios.delete<Plant>(url)
      .then((resp) => {
        let payload = plant;
        dispatch({ type: "DESTROY_PLANT_OK", payload });
      })
      .catch((payload) => {
        error(t("Tried to delete plant, but couldn't."));
        dispatch({ type: "DESTROY_PLANT_ERR", payload });
      });
  };
};