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

  handleMouseOver = () => {
    // dispatch
  }

  render() {
    let plant = this.props.plant;
    let plantedAt = (plant && plant.planted_at) || moment();
    let dayPlanted = moment();
    let label = (plant && plant.name) || ("Unknown plant");
    let daysOld = dayPlanted.diff(moment(plantedAt), "days") + 1;
    let plantId;
    if (plant && plant.id) { plantId = plant.id.toString(); }

    return <div className="plant-search-item" id={plantId}
      onMouseOver={this.handleMouseOver}>
      <img className="plant-search-item-image" src={this.state.icon} />
      <span className="plant-search-item-name">{label}</span>
      <i className="plant-search-item-age">
        {daysOld} {t("days old")}</i>
    </div>;
  };
}
