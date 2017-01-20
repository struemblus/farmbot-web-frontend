import * as React from "react";
import { Link } from "react-router";
import { Plant } from "../interfaces";
import { Everything } from "../../interfaces";
import { Select } from "../../ui";
import { ICONS } from "../icons";
import { connect } from "react-redux";
import { CustomOptionProps } from "../../interfaces";

class OptionComponent extends React.Component<CustomOptionProps, {}> {
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
    return <div className={this.props.className}
      onMouseDown={this.handleMouseDown.bind(this)}
      onMouseEnter={this.handleMouseEnter.bind(this)}
      onMouseMove={this.handleMouseMove.bind(this)}>
      {this.props.children}
    </div>;
  }
}

@connect((state: Everything) => state)
export class Plants extends React.Component<Everything, {}> {
  constructor() {
    super();
    this.state = { searchResults: [] };
  }

  dragstart_handler(ev: React.DragEvent<HTMLElement>) {
    // ev.dataTransfer.setData("text", ev.currentTarget);
    ev.dataTransfer.effectAllowed = "move";
  }

  render() {
    let { plants } = this.props.designer;

    let plantOptions = plants.map(plant => {
      return { label: plant.openfarm_slug, value: plant.id };
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
          <Select options={plantOptions}
            optionComponent={OptionComponent}
          />
          <div className="Select-menu-outer">
            <div role="listbox" className="Select-menu" id="react-select-2--list">
              <div className="Select-option is-focused">tomato</div>
              <div className="Select-option">tomato</div>
              <div className="Select-option">tomato</div>
              <div className="Select-option">tomato</div>
              <div className="Select-option">tomato</div>
              <div className="Select-option">tomato</div>
              <div className="Select-option">tomato</div>
              <div className="Select-option">tomato</div>
              <div className="Select-option">tomato</div>
              <div className="Select-option">tomato</div>
            </div>
          </div>
        </div>

        <div className="object-list current-plants">
          <label>Current Plants</label>
          <ul className="row">

          </ul>
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
