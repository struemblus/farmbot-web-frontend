import * as React from "react";
import { t } from "i18next";
import * as moment from "moment";
import { DEFAULT_ICON, cachedIcon } from "../../open_farm/index";
import { push } from "../../history";
import { TaggedPlantPointer } from "../../resources/tagged_resources";

type IMGEvent = React.SyntheticEvent<HTMLImageElement>

interface Props {
  tpp: TaggedPlantPointer;
  dispatch: Function;
}

// The inidividual plants that show up in the farm designer sub nav.
export function PlantInventoryItem(props: Props) {
  let plant = props.tpp.body;
  let plantId = (plant.id || "ERR_NO_PLANT_ID").toString();

  let toggle = ({ currentTarget }: React.SyntheticEvent<HTMLDivElement>) => {
    props.dispatch({ type: "TOGGLE_HOVERED_PLANT", payload: currentTarget.id });
  };

  let click = () => {
    push("/app/designer/plants/" + plantId);
    props.dispatch({ type: "SELECT_PLANT", payload: props.tpp.uuid });
  };

  // See `cachedIcon` for more details on this.
  function maybeGetCachedIcon(e: IMGEvent) {
    let OFS = props.tpp.body.openfarm_slug;
    let img = e.currentTarget;
    OFS && cachedIcon(OFS)
      .then((i: string) => {
        i !== img.getAttribute("src") &&
          img.setAttribute("src", i);
      });
  }

  // Name given from OpenFarm's API.
  let label = plant.name || "Unknown plant";

  // Original planted date vs time now to determine age.
  let plantedAt = plant.created_at || moment();
  let currentDay = moment();
  let daysOld = currentDay.diff(moment(plantedAt), "days") + 1;

  return <div
    className="plant-search-item"
    key={plantId}
    onMouseEnter={e => toggle(e)}
    onMouseLeave={e => toggle(e)}
    onClick={click}>
    <img
      className="plant-search-item-image"
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
