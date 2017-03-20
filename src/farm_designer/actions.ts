import * as Axios from "axios";
import { error } from "../ui";
import { Plant, MovePlantProps, FarmEvent } from "./interfaces";
import { Thunk } from "../redux/interfaces";
import { t } from "i18next";
import { API } from "../api";
import { destroy, create, update } from "../api/crud";

export function saveFarmEvent(body: Partial<FarmEvent>) {
  const action = body.id ? create : update;
  /** Typecast OK here because API will handle missing properties */
  return action({ kind: "farm_events", body: (body as FarmEvent) });
}

export function destroyFarmEvent(body: FarmEvent): Thunk {
  return destroy({ kind: "farm_events", body })
}

export function savePlant(body: Plant): Thunk {
  const action = body.id ? create : update;
  return action({ kind: "plants", body });
}

export function destroyPlant(body: Plant): Thunk {
  return destroy({ kind: "plants", body });
}

export function movePlant(payload: MovePlantProps) {
  return { type: "MOVE_PLANT", payload };
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
