import * as React from "react";
import { Link } from "react-router";
import { connect } from "react-redux";
import { t } from "i18next";
import { Everything } from "../../interfaces";
import { CustomFBSelect } from "../../ui";
import { selectAllPlantPointers } from "../../resources/selectors";
import { PlantInventoryItem } from "./plant_inventory_item";
import { TaggedPlantPointer } from "../../resources/tagged_resources";

interface PlantsProps {
  plants: TaggedPlantPointer[];
}

// ehhh...
export interface TPPWithDispatch extends TaggedPlantPointer {
  dispatch: Function;
}

function mapStateToProps(props: Everything): PlantsProps {
  let plants = selectAllPlantPointers(props.resources.index);
  plants.map((p: TPPWithDispatch) => p.dispatch = props.dispatch);
  return { plants };
}

@connect(mapStateToProps)
export class Plants extends React.Component<PlantsProps, {}> {

  render() {
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
          <CustomFBSelect resourceList={this.props.plants}
            optionComponent={PlantInventoryItem}
            forceOpen={true}
            placeholder="Search Plants"
          />
        </div>

      </div>

      <Link to="/app/designer/plants/crop_search">
        <div className="plus-button green">
          <i className="fa fa-2x fa-plus" />
        </div>
      </Link>

    </div>;
  }
};
