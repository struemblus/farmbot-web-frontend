import * as React from "react";
import { t } from "i18next";
import * as moment from "moment";
import { DEFAULT_ICON, cachedIcon } from "../../open_farm/index";
import { push } from "../../history";
import { TPPWithDispatch } from "./plant_inventory";

type IMGEvent = React.SyntheticEvent<HTMLImageElement>

// The inidividual plants that show up in the farm designer sub nav.
export function PlantInventoryItem(props: TPPWithDispatch) {

  let plant = props.body;
  let plantId = (plant.id || "ERR_NO_PLANT_ID").toString();

  let toggle = ({ currentTarget }: React.SyntheticEvent<HTMLDivElement>) => {
    // props.dispatch({ type: "TOGGLE_HOVERED_PLANT", payload: currentTarget });
  }

  let click = () => push("/app/designer/plants/" + plantId);

  // See `cachedIcon` for more details on this.
  function maybeGetCachedIcon(e: IMGEvent) {
    let OFS = props.body.openfarm_slug;
    let img = e.currentTarget;
    OFS && cachedIcon(OFS)
      .then(i => {
        if (i === img.getAttribute("src")) { return; }
        img.setAttribute("src", i);
      });
  }

  // Name given from OpenFarm's API.
  let label = plant.name || "Unknown plant";

  // Original planted date vs time now to determine age.
  let plantedAt = plant.created_at || moment();
  let currentDay = moment();
  let daysOld = currentDay.diff(moment(plantedAt), "days") + 1;

  return <div className="plant-search-item"
    key={plantId}
    onMouseEnter={e => toggle(e)}
    onMouseLeave={e => toggle(e)}
    onClick={() => click}>
    <img className="plant-search-item-image"
      src={DEFAULT_ICON}
      onLoad={maybeGetCachedIcon} />
    <span className="plant-search-item-name">
      {label}
    </span>
    <i className="plant-search-item-age">
      {daysOld} {t("days old")}
    </i>
  </div>;
}
