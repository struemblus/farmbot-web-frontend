import * as React from "react";
import { TaggedPlant } from "../../resources/tagged_resources";
import { DEFAULT_ICON } from "../../open_farm/index";
import * as moment from "moment";
import { t } from "i18next";

interface Props {
  plant: TaggedPlant | undefined;
}

interface State {
  icon: string;
}

export class PlantInventoryItem extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = { icon: DEFAULT_ICON };
  }
  render() {
    let plant = this.props.plant;
    let planted_at = (plant && plant.body.planted_at) || moment();
    let dayPlanted = moment();
    let label = ((plant && plant.body.name) ||
      ("Unknown plant"));
    let daysOld = dayPlanted.diff(moment(planted_at), "days") + 1;
    return <div className="plant-search-item">
      <img className="plant-search-item-image" src={DEFAULT_ICON} />
      <span className="plant-search-item-name">{label}</span>
      <i className="plant-search-item-age">
        {daysOld} {t("days old")}</i>
    </div>;
  };
}
