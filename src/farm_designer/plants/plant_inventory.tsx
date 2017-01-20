import * as React from "react";
import { Link } from "react-router";
import { Plant } from "../interfaces";
import { Everything } from "../../interfaces";
import { Select } from "../../ui";
import { ICONS } from "../icons";
import { connect } from "react-redux";
import { CustomOptionProps } from "../../interfaces";
import * as moment from "moment";
import { ReactSelectProps } from "react-select";

// TODO: Optimize these if possible and relocate them 
interface PlantOptionProps extends CustomOptionProps {
  option: {
    openfarm_slug: string;
    plant_id: number;
    img_url: string;
    planted_at: string;
  };
}

interface HandleRedirectEvent extends ReactSelectProps {
  plant_id: string;
}

interface PlantsProps extends Everything {
  router: {
    push: Function;
  };
}

class OptionComponent extends React.Component<PlantOptionProps, {}> {
  handleMouseDown(e: React.SyntheticEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    this.props.onSelect(this.props.option, e);
  };

  handleMouseEnter(e: React.SyntheticEvent<HTMLDivElement>) {
    this.props.onFocus(this.props.option, e);
  };

  handleMouseMove(e: React.SyntheticEvent<HTMLDivElement>) {
    if (this.props.isFocused) { return; };
    this.props.onFocus(this.props.option, e);
  };

  render() {
    let {
      openfarm_slug,
      plant_id,
      img_url,
      planted_at
    } = this.props.option;

    let dayPlanted = moment();
    // Same day = 1 !0
    let daysOld = dayPlanted.diff(moment(planted_at), "days") + 1;

    return <div className={this.props.className}
      onMouseDown={this.handleMouseDown.bind(this)}
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseMove={this.handleMouseMove.bind(this)}>
      <img src={img_url} alt={openfarm_slug} />
      <Link className="plant-name"
        to={`/app/designer/plants/plant/${plant_id}`}>
        {this.props.children}
      </Link>
      <i className="plant-age">{daysOld} days old</i>
    </div>;
  }
}

@connect((state: Everything) => state)
export class Plants extends React.Component<PlantsProps, {}> {
  handleRedirect(e: HandleRedirectEvent) {
    this.props.router.push(`/app/designer/plants/${e.plant_id}`);
  }

  render() {
    let { plants } = this.props.designer;

    let plantOptions = plants.map(plant => {
      return {
        openfarm_slug: plant.openfarm_slug,
        plant_id: plant.id,
        img_url: plant.img_url,
        planted_at: plant.planted_at,
        label: plant.name
      };
    });

    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <div className="panel-tabs">
          <Link to="/app/designer/plants" className="active">
            Plants
          </Link>
          <Link to="/app/designer/farm_events" >
            Farm Events
          </Link>
        </div>
      </div>

      <div className="panel-content">

        <div className="thin-search-wrapper">
          <i className="fa fa-search"></i>
          <Select options={plantOptions}
            optionComponent={OptionComponent}
            onChange={this.handleRedirect.bind(this)}
            placeholder="Search Plants"
          />
        </div>

      </div>

      <Link to="/app/designer/plants/add">
        <div className="plus-button add-plant button-like"
          data-toggle="tooltip"
          title="Add plant">
          <i className="fa fa-2x fa-plus" />
        </div>
      </Link>

    </div>;
  }
};
