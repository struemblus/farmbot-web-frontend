import * as React from "react";
import { GardenMap } from "./map/garden_map";
import { connect } from "react-redux";
import { success } from "../ui";
import { Link } from "react-router";
import { t } from "i18next";
import { Props } from "./interfaces";
import { mapStateToProps } from "./state_to_props";

// TODO: Need to get `location` and `params` into `state_to_props` somehow...
interface FixMePlease extends Props {
  location: { pathname: string; };
  params: { species: string; }
}

@connect(mapStateToProps)
export class FarmDesigner extends React.Component<FixMePlease, {}> {
  componentDidMount() {
    success("Subscribe to the FarmBot.io mailing list for news and updates.",
      "Work in Progress");
  }

  render() {
    // Kinda nasty, similar to the old q="NoTab" we used to determine no panels.
    // This one just makes sure the designer can click it's panel tabs without
    // the other headers getting in the way. There's more re-usability in this.
    if (this.props.location.pathname === "/app/designer") {
      document.body.classList.add("designer-tab");
    } else {
      document.body.classList.remove("designer-tab");
    }

    return (
      <div className="farm-designer">
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
          {this.props.children}
        </div>

        <div className="farm-designer-map">
          <GardenMap
            dispatch={this.props.dispatch}
            designer={this.props.designer}
            sync={this.props.sync}
            params={this.props.params}
            location={this.props.location} />
        </div>
      </div>
    );
  }
}

