import * as React from "react";
import { Link } from "react-router";
import { Everything } from "../../interfaces";
import { connect } from "react-redux";
import * as moment from "moment";
import { t } from "i18next";
import { PlantInfoProps, Plant } from "../interfaces";
import { error } from "../../ui/index";
import { history } from "../../history";
import { findWhere } from "../../resources/selectors";
import { isTaggedPlant } from "../../resources/tagged_resources";

function mapStateToProps(props: Everything) {
  let findCurrentPlant = (plant_id: number) => {
    let query: Partial<Plant> = { id: plant_id };
    let currentPlant = findWhere(props.resources.index, query);
    return currentPlant;
  }

  return {
    // TODO: This is definitely not right, figure out query objects
    plant_id: parseInt(history.getCurrentLocation().pathname.split("/")[4]),
    findCurrentPlant
  }
}

@connect(mapStateToProps)
export class PlantInfo extends React.Component<PlantInfoProps, {}> {
  render() {
    if (!isTaggedPlant(this.props.findCurrentPlant(this.props.plant_id))) {
      history.push("/app/designer/plants");
      error("Couldn't find plant.", "Error");
      throw new Error(`VERY BAD!! Plant could not be found by id, 
        possible stale data!`);
    }

    let { name, x, y, planted_at, id } = this.props
      .findCurrentPlant(this.props.plant_id).body;

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
