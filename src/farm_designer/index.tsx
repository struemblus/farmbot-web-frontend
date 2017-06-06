import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { t } from "i18next";
import { GardenMap } from "./map/garden_map";
import { Props, State } from "./interfaces";
import { mapStateToProps } from "./state_to_props";
import { history } from "../history";
import { Plants } from "./plants/plant_inventory";
import { GardenMapLegend } from "./map/garden_map_legend";
import { isMobile } from "../util";

@connect(mapStateToProps)
export class FarmDesigner extends React.Component<Props, Partial<State>> {

  state: State = {
    zoomLvl: 1,
    showPlants: true,
    showPoints: true,
    showSpread: false,
    showFarmbot: true
  }

  zoom = (zoomNumber: number) => () => {
    let { zoomLvl } = this.state;
    zoomLvl && this.setState({ zoomLvl: zoomLvl + zoomNumber });
  }

  childComponent(props: Props) {
    let fallback = isMobile() ? undefined
      : React.createElement(Plants, props);
    return this.props.children || fallback;
  }

  toggle = (name: keyof State) =>
    () => this.setState({ [name]: !this.state[name] });

  render() {
    // Kinda nasty, similar to the old q="NoTab" we used to determine no panels.
    // This one just makes sure the designer can click it's panel tabs without
    // the other headers getting in the way. There's more re-usability in this.
    if (history.getCurrentLocation().pathname === "/app/designer") {
      document.body.classList.add("designer-tab");
    } else {
      document.body.classList.remove("designer-tab");
    }

    let {
      zoomLvl,
      showPlants,
      showPoints,
      showSpread,
      showFarmbot
    } = this.state;

    return <div className="farm-designer">

      <GardenMapLegend
        zoom={this.zoom}
        toggle={this.toggle}
        zoomLvl={zoomLvl}
        showPlants={showPlants}
        showPoints={showPoints}
        showSpread={showSpread}
        showFarmbot={showFarmbot}
      />

      <div className="panel-header gray-panel designer-mobile-nav">
        <div className="panel-tabs">
          <Link to="/app/designer" className="mobile-only active">
            {t("Designer")}
          </Link>
          <Link to="/app/designer/plants">
            {t("Plants")}
          </Link>
          <Link to="/app/designer/farm_events">
            {t("Farm Events")}
          </Link>
        </div>
      </div>
      <div className="farm-designer-panels">
        {this.childComponent(this.props)}
      </div>

      <div className="farm-designer-map" style={{ zoom: this.state.zoomLvl }}>
        <GardenMap
          showPoints={showPoints}
          showPlants={showPlants}
          showSpread={showSpread}
          showFarmbot={showFarmbot}
          selectedPlant={this.props.selectedPlant}
          crops={this.props.crops}
          dispatch={this.props.dispatch}
          designer={this.props.designer}
          plants={this.props.plants}
          points={this.props.points}
          toolSlots={this.props.toolSlots}
        />
      </div>
    </div>
  }
}
