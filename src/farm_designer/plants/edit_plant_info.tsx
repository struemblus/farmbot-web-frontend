import * as React from "react";
import { BackArrow, error } from "../../ui";
import { connect } from "react-redux";
import * as moment from "moment";
import { destroyPlant } from "../actions";
import { t } from "i18next";
import { EditPlantInfoProps } from "../interfaces";
import { selectAll } from "../../resources/util";
import { history } from "../../history";

function mapStateToProps(props: EditPlantInfoProps) {
  let findCurrentPlant = (plantId: number) => {
    let plants = selectAll(props.resources.plants);
    let currentPlant = _.findWhere(plants, { id: plantId }) || {
      planted_at: moment().toISOString(),
      name: "Error: No plant name.",
      x: "Error: No x coordinate",
      y: "Error: No y coordinate"
    };
    return currentPlant;
  }

  return {
    // This is definitely not right, figure out query objects
    plant_id: parseInt(history.getCurrentLocation().pathname.split("/")[4]),
    push: history.push,
    dispatch: props.dispatch,
    findCurrentPlant
  }
}

@connect(mapStateToProps)
export class EditPlantInfo extends React.Component<EditPlantInfoProps, {}> {
  componentDidMount() {
    let currentPlant = this.props.findCurrentPlant(this.props.plant_id);
    if (!currentPlant) {
      this.props.push("/app/designer/plants");
      error("Couldn't find plant.", "Error");
    }
  }

  destroy = () => {
    this.props.dispatch(destroyPlant(
      this.props.findCurrentPlant(this.props.plant_id)
    ));
    this.props.push("/app/designer/plants");
  }

  render() {
    let { name, x, y, planted_at } = this.props
      .findCurrentPlant(this.props.plant_id);

    let dayPlanted = moment();
    // Same day = 1 !0
    let daysOld = dayPlanted.diff(moment(planted_at), "days") + 1;
    let plantedAt = moment(planted_at).format("MMMM Do YYYY, h:mma");

    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <BackArrow />
          <span className="title">{t("Edit")} {name}</span>
        </p>
      </div>
      <div className="panel-content">
        <label>{t("Plant Info")}</label>
        <ul>
          <li>{t("Started")}: {plantedAt}</li>
          <li>{t("Age")}: {daysOld}</li>
          <li>{t("Location")}: ({x}, {y})</li>
        </ul>
        <label>{t("Regimens")}</label>
        <ul>
          <li>Soil Acidifier</li>
        </ul>
        <label>{t("Delete this plant")}</label>
        <div>
          <button className="red button-like left"
            onClick={this.destroy}>
            {t("Delete")}
          </button>
        </div>
      </div>
    </div>;
  }
}
