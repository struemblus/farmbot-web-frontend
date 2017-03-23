import * as React from "react";
import { BackArrow, error, success, info } from "../../ui";
import { connect } from "react-redux";
import * as moment from "moment";
import { t } from "i18next";
import { EditPlantInfoProps, Plant } from "../interfaces";
import { history } from "../../history";
import { Everything } from "../../interfaces";
import { findWhere } from "../../resources/selectors";
import { isTaggedPlant, TaggedPlant } from "../../resources/tagged_resources";
import { destroy } from "../../api/crud";

function mapStateToProps(props: Everything): EditPlantInfoProps {

  let plant_id = parseInt(history.getCurrentLocation().pathname.split("/")[4]);
  let query: Partial<Plant> = { id: plant_id };
  let currentPlant = findWhere(props.resources.index, query);
  let plant_info: undefined | {} = undefined;
  if (currentPlant && isTaggedPlant(currentPlant)) {
    plant_info = {}
  }

  return {
    plant_info: undefined,
    push: history.push,
    dispatch: props.dispatch
  }
}

@connect(mapStateToProps)
export class EditPlantInfo extends React.Component<EditPlantInfoProps, {}> {
  destroy = (plantUUID: string) => {
    this.props.dispatch(destroy(plantUUID))
      .then(() => history.push("/app/designer/plants"))
      .catch(() => error("Could not delete plant.", "Error"))
  }

  render() {
    let plant = this.props.findCurrentPlant(this.props.plant_id);
    if (_.isUndefined(plant)) {
      history.push("/app/designer/plants");
      error("Couldn't find plant.", "Error");
    }

    let currentPlant = this.props.findCurrentPlant(this.props.plant_id);

    let { name, x, y, planted_at } = currentPlant.body;

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
            onClick={() => this.destroy(currentPlant.uuid)}>
            {t("Delete")}
          </button>
        </div>
      </div>
    </div>;
  }
}
