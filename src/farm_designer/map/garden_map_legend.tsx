import * as React from "react";
import { t } from "i18next";
import { LayerToggle } from "./layer_toggle";
import { State } from "../interfaces";

interface GardenMapLegendProps {
  zoom: (value: number) => () => void;
  toggle: (property: keyof State) => () => void;
  zoomLvl: number;
  legendMenuOpen: boolean;
  showPlants: boolean;
  showPoints: boolean;
  showSpread: boolean;
  showFarmbot: boolean;
}

interface GardenMapLegendState { }

export class GardenMapLegend extends
  React.Component<GardenMapLegendProps, Partial<GardenMapLegendState>> {

  state: GardenMapLegendState = {}

  render() {
    let {
      zoom,
      toggle,
      zoomLvl,
      legendMenuOpen,
      showPlants,
      showPoints,
      showSpread,
      showFarmbot } = this.props;

    let plusBtnClass = (zoomLvl && zoomLvl <= 0.9) ? "" : "disabled";
    let minusBtnClass = (zoomLvl && zoomLvl >= 0.4) ? "" : "disabled";
    let menuClass = legendMenuOpen ? "active" : "";

    return <div
      className={"garden-map-legend " + menuClass}
      style={{ zoom: 1 }}>
      <div
        className={"menu-pullout " + menuClass}
        onClick={toggle("legendMenuOpen")}>
        <span>
          {t("Menu")}
        </span>
        <i className={"fa fa-2x fa-arrow-left"} />
      </div>
      <button
        className={"plus-button green top " + plusBtnClass}
        onClick={zoom(0.1)}>
        <i className="fa fa-2x fa-plus" />
      </button>
      <button
        className={"plus-button green bottom " + minusBtnClass}
        onClick={zoom(-0.1)}>
        <i className="fa fa-2x fa-minus" />
      </button>
      <div className="map-layers">
        <LayerToggle
          value={showPlants}
          label={t("Plants?")}
          onClick={toggle("showPlants")}
        />
        <LayerToggle
          value={showPoints}
          label={t("Points?")}
          onClick={toggle("showPoints")}
        />
        <LayerToggle
          value={showSpread}
          label={t("Spread?")}
          onClick={toggle("showSpread")}
        />
        <LayerToggle
          value={showFarmbot}
          label={t("FarmBot?")}
          onClick={toggle("showFarmbot")}
        />
      </div>
    </div>
  }
}
