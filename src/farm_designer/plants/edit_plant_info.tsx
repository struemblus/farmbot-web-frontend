import * as React from "react";
import { BackArrow, error } from "../../ui";
import { connect } from "react-redux";
import * as moment from "moment";
import { t } from "i18next";
import { EditPlantInfoProps, Plant } from "../interfaces";
import { history } from "../../history";
import { Everything } from "../../interfaces";
import { findWhere } from "../../resources/selectors";
import { isTaggedPlant } from "../../resources/tagged_resources";
import { destroy } from "../../api/crud";

function mapStateToProps(props: Everything): EditPlantInfoProps {
  let findCurrentPlant = (plant_id: number) => {
    let query: Partial<Plant> = { id: plant_id };
    let currentPlant = findWhere(props.resources.index, query);
    if (currentPlant && isTaggedPlant(currentPlant)) {
      return currentPlant;
    } else {
      throw new Error("ERROR: Plant not found using plant id.");
    }
  }

  return {
    // TODO: This is definitely not right, figure out query objects
    plant_id: parseInt(history.getCurrentLocation().pathname.split("/")[4]),
    push: history.push,
    dispatch: props.dispatch,
    findCurrentPlant
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
    if (!isTaggedPlant(this.props.findCurrentPlant(this.props.plant_id))) {
      history.push("/app/designer/plants");
      error("Couldn't find plant.", "Error");
      throw new Error(`VERY BAD!! Plant could not be found by id, 
        possible stale data!`);
    }
    let currentPlant = this.props.findCurrentPlant(this.props.plant_id);

    // try {
    //   let currentPlant = this.props.findCurrentPlant(this.props.plant_id);
    // } catch (e) {
    //   error("Could not find plant.", "Error");
    //   return <p>BRBLOL</p>
    // }

    let { name, x, y, planted_at } = currentPlant.body;

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
            onClick={() => this.destroy(currentPlant.uuid)}>
            {t("Delete")}
          </button>
        </div>
      </div>
    </div>;
  }
}
