import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";
import { t } from "i18next";
import { GardenMap } from "./map/garden_map";
import { Props, State } from "./interfaces";
import { mapStateToProps } from "./state_to_props";
import { history } from "../history";
import { Plants } from "./plants/plant_inventory";
import { isMobile } from "../util";
import { LayerToggle } from "./map/layer_toggle";

// The toggle-able options in the legend
type ShowOptions =
  | "showPlants"
  | "showPoints"
  | "showSpread"
  | "showFarmbot";

@connect(mapStateToProps)
export class FarmDesigner extends React.Component<Props, Partial<State>> {

  state: State = {
    zoomLvl: 0.6,
    showPlants: true,
    showPoints: true,
    showSpread: false,
    showFarmbot: true
  }

  zoom = (zoomNumber: number) => {
    let zl = this.state.zoomLvl;
    zl && this.setState({ zoomLvl: zl + zoomNumber });
  }

  childComponent() {
    let fallback = isMobile() ?
      undefined : React.createElement(Plants, this.props as any);
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

    let plusBtnClass = (zoomLvl && zoomLvl <= 0.9) ? "" : "disabled";
    let minusBtnClass = (zoomLvl && zoomLvl >= 0.4) ? "" : "disabled";

    return <div className="farm-designer">

      <div className="garden-map-legend" style={{ zoom: 1 }}>
        <button className={"plus-button green " + plusBtnClass}
          onClick={() => this.zoom(0.1)}>
          <i className="fa fa-2x fa-plus" />
        </button>
        <button className={"plus-button green " + minusBtnClass}
          onClick={() => this.zoom(-0.1)}>
          <i className="fa fa-2x fa-minus" />
        </button>
        <div className="map-layers">
          <LayerToggle value={this.state.showPlants}
            label={t("Plants?")}
            onClick={this.toggle("showPlants")} />
          <LayerToggle value={this.state.showPoints}
            label={t("Points?")}
            onClick={this.toggle("showPoints")} />
          <LayerToggle value={this.state.showSpread}
            label={t("Spread?")}
            onClick={this.toggle("showSpread")} />
          <LayerToggle value={this.state.showFarmbot}
            label={t("FarmBot?")}
            onClick={this.toggle("showFarmbot")} />
        </div>
      </div>

      <div className="panel-header gray-panel designer-mobile-nav">
        <div className="panel-tabs">
          <Link to="/app/designer" className="mobile-only active">
            {t("Designer")}
          </Link>
          <Link to="/app/designer/plants">
            {t("Plants")}
          </Link>
          <Link to="/app/designer/farm_events" >
            {t("Farm Events")}
          </Link>
        </div>
      </div>
      <div className="farm-designer-panels">
        {this.childComponent()}
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
