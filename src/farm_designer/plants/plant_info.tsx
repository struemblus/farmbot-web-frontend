import * as React from "react";
import { Link } from "react-router";
import { Everything } from "../../interfaces";
import { connect } from "react-redux";
import * as moment from "moment";
import { t } from "i18next";
import { PlantInfoProps } from "../interfaces";
import { error } from "../../ui/index";
import { selectAll } from "../../resources/util";
import { history } from "../../history";

function mapStateToProps(props: PlantInfoProps) {
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
    // TODO: This is definitely not right, figure out query objects
    plant_id: parseInt(history.getCurrentLocation().pathname.split("/")[4]),
    push: history.push,
    findCurrentPlant
  }
}

@connect(mapStateToProps)
export class PlantInfo extends React.Component<PlantInfoProps, {}> {
  componentDidMount() {
    let currentPlant = this.props.findCurrentPlant(this.props.plant_id);
    if (!currentPlant) {
      this.props.push("/app/designer/plants");
      error("Couldn't find plant.", "Error");
    }
  }

  render() {
    let { name, x, y, planted_at, id } = this.props
      .findCurrentPlant(this.props.plant_id);

    let dayPlanted = moment();
    // Same day = 1 !0
    let daysOld = dayPlanted.diff(moment(planted_at), "days") + 1;
    let plantedAt = moment(planted_at).format("MMMM Do YYYY, h:mma");
    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <p className="panel-title">
          <Link to={`/app/designer/plants`} className="back-arrow">
            <i className="fa fa-arrow-left"></i>
          </Link>
          <span className="title">{name}</span>
          <Link to={`/app/designer/plants/` + (id || "BROKEN")
            .toString() + `/edit`}
            className="right-button">
            {t("Edit")}
          </Link>
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
      </div>
    </div>;
  }
}
