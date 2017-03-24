import * as React from "react";
import { error } from "../../ui";
import { connect } from "react-redux";
import * as moment from "moment";
import { t } from "i18next";
import { EditPlantInfoProps, Plant, PlantData } from "../interfaces";
import { history } from "../../history";
import { Everything } from "../../interfaces";
import { findWhere } from "../../resources/selectors";
import { isTaggedPlant } from "../../resources/tagged_resources";
import { destroy } from "../../api/crud";
import { Link } from "react-router";

function mapStateToProps(props: Everything): EditPlantInfoProps {
  // TODO: Handle this better with query params
  let plant_id = parseInt(history.getCurrentLocation().pathname.split("/")[4]);
  let query: Partial<Plant> = { id: plant_id };
  let currentPlant = findWhere(props.resources.index, query);

  let plant_info: undefined | PlantData = undefined;
  if (currentPlant && currentPlant.body.id && isTaggedPlant(currentPlant)) {
    let { name, x, y, planted_at, id } = currentPlant.body;
    plant_info = { name, x, y, planted_at, id, uuid: currentPlant.uuid };
  }

  if (!plant_info) {
    history.push("/app/designer/plants");
    error("Plant could not be found.", "Error");
  }

  return {
    plant_info,
    push: history.push,
    dispatch: props.dispatch,
  }
}

@connect(mapStateToProps)
export class PlantInfo extends React.Component<EditPlantInfoProps, {}> {
  destroy = (plantUUID: string) => {
    this.props.dispatch(destroy(plantUUID))
      .then(() => history.push("/app/designer/plants"))
      .catch(() => error("Could not delete plant.", "Error"))
  }

  fallback = () => <span>Redirecting...</span>

  default = (plant_info: PlantData) => {
    let { planted_at, name, x, y, id } = plant_info;
    let dayPlanted = moment();
    let daysOld = dayPlanted.diff(moment(planted_at), "days") + 1;
    let plantedAt = moment(planted_at).format("MMMM Do YYYY, h:mma");

    return <div className="panel-container green-panel" >
      <div className="panel-header green-panel">
        <p className="panel-title">
          <Link to="/app/designer/plants" className="back-arrow">
            <i className="fa fa-arrow-left" />
          </Link>
          <span className="title">{t("Edit")} {name}</span>
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

  render() {
    let { plant_info } = this.props;
    return plant_info ? this.default(plant_info) : this.fallback();
  }
}
