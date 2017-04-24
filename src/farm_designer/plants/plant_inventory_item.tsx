import * as React from "react";
import { DEFAULT_ICON, cachedIcon } from "../../open_farm/index";
import * as moment from "moment";
import { t } from "i18next";
import { TaggedPlant } from "../../resources/tagged_resources";
import { push } from "../../history";

type DIVEvent = React.SyntheticEvent<HTMLDivElement>
type IMGEvent = React.SyntheticEvent<HTMLImageElement>

// The inidividual plants that show up in the farm designer sub nav.
export function PlantInventoryItem(props: TaggedPlant) {

  // CSS to make apparent the associated mapped plant about to be clicked.
  let mouseEnter = (plantId: string) => (e: DIVEvent) => {
    console.log(plantId, e);

    let { classList } = e.currentTarget;
    classList.add("eligible");
  }

  // Just removes the previous styling.
  let mouseLeave = (plantId: string) => (e: DIVEvent) => {
    let { classList } = e.currentTarget;
    classList.remove("eligible");
  }

  // Handler for navigation and CSS.
  let handleClick = (plantId: string) => (e: DIVEvent) => {
    let { classList } = e.currentTarget;
    push("/app/designer/plants/" + plantId);
    classList.remove("eligible");
    classList.add("chosen");
  }

  // See `cachedIcon` for more details on this.
  let maybeGetCachedIcon = (e: IMGEvent) => {
    let OFS = props.body.openfarm_slug;
    let img = e.currentTarget;
    // DEFAULT_ICON will be fallback.
    OFS && cachedIcon(OFS)
      .then(i => img.setAttribute("src", i));
  }

  // For brevity's sake.
  let plant = props.body;

  // Name given from OpenFarm's API.
  let label = plant.name || "Unknown plant";

  // Original planted date vs time now to determine age.
  let plantedAt = plant.planted_at || moment();
  let currentDay = moment();
  let daysOld = currentDay.diff(moment(plantedAt), "days") + 1;

  // Needed for React keys and navigating to correct plant_info page.
  let plantId = (plant.id || "ERR_NO_PLANT_ID").toString();

  return <div className="plant-search-item" key={plantId}
    onMouseEnter={mouseEnter(plantId)}
    onMouseLeave={mouseLeave(plantId)}
    onClick={handleClick(plantId)}>
    <img className="plant-search-item-image"
      src={DEFAULT_ICON} onLoad={maybeGetCachedIcon} />
    <span className=";plant-search-item-name">{label}</span>
    <i className="plant-search-item-age">
      {daysOld} {t("days old")}</i>
  </div>;
}
