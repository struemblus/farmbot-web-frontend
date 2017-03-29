import * as React from "react";
import { Link } from "react-router";
import { Everything } from "../../interfaces";
import { DeprecatedFBSelect, DropDownItem } from "../../ui";
import { connect } from "react-redux";
import * as moment from "moment";
import { t } from "i18next";
import { DEFAULT_ICON } from "../../open_farm/index";
import { selectAllPlants } from "../../resources/selectors";
import { TaggedPlant } from "../../resources/tagged_resources";

function OptionComponent(plants: TaggedPlant[]) {
  let indexedById = _.indexBy(plants, "id");
  return (props: DropDownItem) => {
    let plant = indexedById[props.value || 0];
    let planted_at = (plant && plant.body.planted_at) || moment();
    let dayPlanted = moment();

    let daysOld = dayPlanted.diff(moment(planted_at), "days") + 1;
    console.dir(plant);
    return <div className="plant-search-item">
      <img className="plant-search-item-image" src={DEFAULT_ICON} />
      <span className="plant-search-item-name">{props.label}</span>
      <i className="plant-search-item-age">
        {daysOld} {t("days old")}</i>
    </div>;
  };
}

@connect((state: Everything) => state)
export class Plants extends React.Component<Everything, {}> {

  handleRedirect = (e: DropDownItem) => {
    this.props.router.push(`/app/designer/plants/` + e.value);
  }

  render() {
    let plants = selectAllPlants(this.props.resources.index);
    let plantOptions = plants.map(plant => {
      if (plant.body.id) {
        return { label: plant.body.name, value: plant.body.id };
      } else {
        throw new Error("Thought plants would have an ID here.");
      }
    });

    return <div className="panel-container green-panel plant-inventory-panel">
      <div className="panel-header green-panel">
        <div className="panel-tabs">
          <Link to="/app/designer" className="mobile-only">
            {t("Designer")}
          </Link>
          <Link to="/app/designer/plants" className="active">
            {t("Plants")}
          </Link>
          <Link to="/app/designer/farm_events" >
            {t("Farm Events")}
          </Link>
        </div>
      </div>

      <div className="panel-content row">

        <div className="thin-search-wrapper">
          <i className="fa fa-search"></i>
          <DeprecatedFBSelect list={plantOptions}
            optionComponent={OptionComponent(plants)}
            onChange={this.handleRedirect}
            isOpen={true}
            placeholder="Search Plants"
          />
        </div>

      </div>

      <Link to="/app/designer/plants/crop_search">
        <div className="plus-button add-plant button-like"
          data-toggle="tooltip"
          title="Add plant">
          <i className="fa fa-2x fa-plus" />
        </div>
      </Link>

    </div>;
  }
};
