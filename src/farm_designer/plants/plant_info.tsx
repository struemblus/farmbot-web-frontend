import * as React from "react";
import { error } from "../../ui";
import { connect } from "react-redux";
import * as moment from "moment";
import { t } from "i18next";
import { EditPlantInfoProps } from "../interfaces";
import { history } from "../../history";
import { destroy } from "../../api/crud";
import { Link } from "react-router";
import { TaggedPlant } from "../../resources/tagged_resources";
import { mapStateToProps, formatPlantInfo } from "./map_state_to_props"

@connect(mapStateToProps)
export class PlantInfo extends React.Component<EditPlantInfoProps, {}> {
  get stringyID() {
    // TODO: ("We should put this into a query object incase the URL changes")
    return history.getCurrentLocation().pathname.split("/")[4] || "";
  }

  get plant() {
    return this.props.findPlant(this.stringyID);
  }
  destroy = (plantUUID: string) => {
    this.props.dispatch(destroy(plantUUID))
      .then(() => history.push("/app/designer/plants"))
      .catch(() => error("Could not delete plant.", "Error"))
  }

  fallback = () => <span>Redirecting...</span>

  default = (plant_info: TaggedPlant) => {
    let info = formatPlantInfo(plant_info);
    return <div className="panel-container green-panel" >
      <div className="panel-header green-panel">
        <p className="panel-title">
          <Link to="/app/designer/plants" className="back-arrow">
            <i className="fa fa-arrow-left" />
          </Link>
          <span className="title">{info.name}</span>
          <Link to={`/app/designer/plants/` + (info.id || "BROKEN")
            .toString() + `/edit`}
            className="right-button">
            {t("Edit")}
          </Link>
        </p>
      </div>
      <div className="panel-content">
        <label>{t("Plant Info")}</label>
        <ul>
          <li>{t("Started")}: {info.plantedAt}</li>
          <li>{t("Age")}: {info.daysOld}</li>
          <li>{t("Location")}: ({info.x}, {info.y})</li>
        </ul>
        <label>{t("Regimens")}</label>
        <ul>
          <li>Soil Acidifier</li>
        </ul>
      </div>
    </div>;
  }

  render() {
    let plant_info = this.plant && this.plant
    return plant_info ? this.default(plant_info) : this.fallback();
  }
}
