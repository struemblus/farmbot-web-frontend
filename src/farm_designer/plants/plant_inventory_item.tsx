import * as React from "react";
import { DEFAULT_ICON, cachedIcon } from "../../open_farm/index";
import * as moment from "moment";
import { t } from "i18next";
import { Plant } from "../interfaces";

interface Props {
  plant: Plant | undefined;
}

interface State {
  icon: string;
}

export class PlantInventoryItem extends React.Component<Props, State> {

  state = { icon: DEFAULT_ICON };

  componentDidMount() {
    if (this.props.plant) {
      cachedIcon(this.props.plant.openfarm_slug)
        .then(icon => this.setState({ icon }))
    }
  }

  handleMouseEnter = (plantId: string) => {
    let selectedPlant = document.getElementById(plantId);
    selectedPlant && selectedPlant.classList.add("eligible");
  }

  handleMouseLeave = (plantId: string) => {
    let selectedPlant = document.getElementById(plantId);
    selectedPlant && selectedPlant.classList.remove("eligible");
  }

  render() {
    let plant = this.props.plant;
    let plantedAt = (plant && plant.planted_at) || moment();
    let dayPlanted = moment();
    let label = (plant && plant.name) || ("Unknown plant");
    let daysOld = dayPlanted.diff(moment(plantedAt), "days") + 1;
    let plantId = (plant && plant.id || "ERR_NO_PLANT_ID").toString();

    return <div className="plant-search-item"
      onMouseEnter={() => this.handleMouseEnter(plantId)}
      onMouseLeave={() => this.handleMouseLeave(plantId)}>
      <img className="plant-search-item-image" src={this.state.icon} />
      <span className="plant-search-item-name">{label}</span>
      <i className="plant-search-item-age">
        {daysOld} {t("days old")}</i>
    </div>;
  };
}
