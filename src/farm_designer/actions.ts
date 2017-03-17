import * as Axios from "axios";
import { error, success } from "../ui";
import { Plant, MovePlantProps, FarmEvent, FarmEventForm } from "./interfaces";
import { Thunk } from "../redux/interfaces";
import { t } from "i18next";
import { API } from "../api";
import { Everything } from "../interfaces";
import { findPlantById } from "../sync/reducer";
import { prettyPrintApiErrors } from "../util";

export function saveFarmEvent(farm_event: FarmEventForm,
  callback: () => void): Thunk {
  let url = API.current.farmEventsPath;
  return function (dispatch, getState) {
    return Axios.post<FarmEvent>(url, farm_event)
      .then(resp => {
        if (resp instanceof Error) {
          error(prettyPrintApiErrors(resp));
          throw resp;
        }

        let payload = {
          id: resp.data.id,
          start_time: resp.data.start_time,
          end_time: resp.data.end_time,
          repeat: resp.data.repeat,
          time_unit: resp.data.time_unit,
          next_time: farm_event.next_time,
          executable_id: resp.data.executable_id,
          executable_type: resp.data.executable_type,
          calendar: resp.data.calendar
        };

        dispatch({ type: "SAVE_FARM_EVENT_OK", payload });
        success(t("Successfully saved event."));
        callback();
      });
  };
};

export function updateFarmEvent(farm_event: FarmEventForm,
  callback: () => void): Thunk {
  let url = API.current.farmEventsPath + farm_event.id;
  return function (dispatch, getState) {
    return Axios.patch<FarmEvent>(url, farm_event)
      .then(resp => {

        let payload = {
          id: resp.data.id,
          start_time: resp.data.start_time,
          end_time: resp.data.end_time,
          repeat: resp.data.repeat,
          time_unit: resp.data.time_unit,
          next_time: farm_event.next_time,
          executable_id: resp.data.executable_id,
          executable_type: resp.data.executable_type,
          calendar: resp.data.calendar
        };

        dispatch({ type: "UPDATE_FARM_EVENT_OK", payload });
        success(t("Successfully saved event."));
        callback();
      })
      .catch(payload => {
        error(t("Tried to update Farm Event, but couldn't."));
      });
  };
};

export function destroyFarmEvent(farm_event_id: number,
  callback: () => void): Thunk {
  let url = API.current.farmEventsPath + farm_event_id;
  return function (dispatch, getState) {
    return Axios.delete<Partial<FarmEvent>>(url, farm_event_id)
      .then(resp => {

        let payload = { id: farm_event_id };

        dispatch({ type: "DELETE_FARM_EVENT_OK", payload });
        success("Deleted farm event.", "Deleted");
        callback();
      })
      .catch(payload => {
        error(t("Tried to delete Farm Event, but couldn't."));
      });
  };
};

/** Deprecating this in favor of the new savePlant() method which users
 * sync object rather than duplicating state.
 */
export function deprecatedSavePlant(plant: Plant): Thunk {
  let url = API.current.plantsPath;
  return function (dispatch, getState) {
    return Axios.post<Plant>(url, plant)
      .then(resp => {

        let payload: Plant = {
          id: resp.data.id,
          x: resp.data.x,
          y: resp.data.y,
          radius: resp.data.radius,
          name: resp.data.name,
          img_url: resp.data.img_url,
          icon_url: resp.data.icon_url,
          openfarm_slug: resp.data.openfarm_slug,
          planting_area_id: resp.data.planting_area_id,
          spread: resp.data.spread,
          planted_at: resp.data.planted_at
        };

        dispatch({ type: "SAVE_PLANT_OK", payload });
      })
      .catch(payload => {
        error(t("Tried to save plant, but couldn't."));
      });
  };
};

export function savePlantById(id: number): Thunk {
  let url = API.current.plantsPath;
  return function (dispatch, getState) {
    let s = getState() as Everything;
    let plant: Plant = findPlantById(s.sync.plants, id);
    return Axios.put<Partial<Plant>>(url + `/${id}`, plant)
      .then(resp => {
        let payload = { ...plant, ...resp.data };
        dispatch({ type: "UPDATE_PLANT_OK", payload });
      })
      .catch(payload => {
        error(t("Tried to save plant, but couldn't."));
      });
  };
};

export function movePlant(payload: MovePlantProps) {
  return { type: "MOVE_PLANT", payload };
};

export function destroyPlant(plant_id: number): Thunk {
  let url = API.current.plantsPath + plant_id;
  return function (dispatch, getState) {
    dispatch({ type: "DESTROY_PLANT_START" });
    return Axios.delete<Plant>(url)
      .then(resp => {
        let payload = plant_id;
        dispatch({ type: "DESTROY_PLANT_OK", payload });
        success("Successfully deleted plant.", "Deleted");
      })
      .catch(payload => {
        error(t("Tried to delete plant, but couldn't."));
        dispatch({ type: "DESTROY_PLANT_ERR", payload });
      });
  };
};
