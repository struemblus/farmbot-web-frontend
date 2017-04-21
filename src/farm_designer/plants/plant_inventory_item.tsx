import * as React from "react";
import { DEFAULT_ICON, cachedIcon } from "../../open_farm/index";
import * as moment from "moment";
import { t } from "i18next";
import { TaggedPlant } from "../../resources/tagged_resources";

export function PlantInventoryItem(props: TaggedPlant) {
  let handleMouseEnter = (plantId: string) => {
    let selectedPlant = document.getElementById(plantId);
    selectedPlant && selectedPlant.classList.add("eligible");
  }

  let handleMouseLeave = (plantId: string) => {
    let selectedPlant = document.getElementById(plantId);
    selectedPlant && selectedPlant.classList.remove("eligible");
  }

  let plant = props.body;

  let plantedAt = plant.planted_at || moment();
  let dayPlanted = moment();
  let label = plant.name || "Unknown plant";

  let daysOld = dayPlanted.diff(moment(plantedAt), "days") + 1;
  let plantId = (plant.id || "ERR_NO_PLANT_ID").toString();

  return <div className="plant-search-item" key={plantId}
    onMouseEnter={() => handleMouseEnter(plantId)}
    onMouseLeave={() => handleMouseLeave(plantId)}>
    <img className="plant-search-item-image" src={DEFAULT_ICON} />
    <span className="plant-search-item-name">{label}</span>
    <i className="plant-search-item-age">
      {daysOld} {t("days old")}</i>
  </div>;
}
