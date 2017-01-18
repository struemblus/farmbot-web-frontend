import * as React from "react";
import { Link } from "react-router";
import { Plant } from "./interfaces";
import { Everything } from "../interfaces";
import { Select } from "../ui";
import { searchPlants } from "./actions";

const pathname = "/app/designer";

interface PlantsState {
  searchResults: any[];
}

export class Plants extends React.Component<Everything, PlantsState> {
  constructor() {
    super();
    this.state = { searchResults: [] };
  }

  dragstart_handler(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.effectAllowed = "move";
  }

  render() {
    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <div className="panel-tabs">
          <ul>
            <li className="hidden-sm hidden-md hidden-lg">
              <Link to={{ pathname, query: { p1: "NoTab" } }}>
                Designer
              </Link>
            </li>
            <li>
              <Link to={{ pathname, query: { p1: "Plants" } }}
                className={"active"}>
                Plants
              </Link>
            </li>
            <li>
              <Link to={{ pathname, query: { p1: "Groups" } }}>
                Groups
                </Link>
            </li>
            <li>
              <Link to={{ pathname, query: { p1: "Zones" } }}>
                Zones
              </Link>
            </li>
            <li className="hidden-sm hidden-md hidden-lg">
              <Link to={{ pathname, query: { p1: "Panel2" } }}>
                Calendar
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="panel-content">
        <Select
          value="one"
          options={this.state.searchResults}
          onInputChange={searchPlants}
        />

        <div className="object-list">
          <label>Current Plants</label>
          <ul>
            <li draggable={true} onDragStart={this.dragstart_handler}
              id="tomato">
              <Link to={{
                pathname: "/app/designer",
                query: { p1: "PlantInfo", id: "tomato" }
              }}>
                Tomato
              </Link>
              <p>{"Unknown planting time"}</p>
            </li>
            <li draggable={true} onDragStart={this.dragstart_handler}
              id="avacado">
              <Link to={{
                pathname: "/app/designer",
                query: { p1: "PlantInfo", id: "tomato" }
              }}>
                Avacado
              </Link>
              <p>{"Unknown planting time"}</p>
            </li>
          </ul>
        </div>
      </div>

      <Link to={{ pathname, query: { p1: "SpeciesCatalog" } }}>
        <div className="plus-button add-plant button-like"
          data-toggle="tooltip"
          title="Add plant">
          <i className="fa fa-2x fa-plus" />
        </div>
      </Link>
    </div>;
  }
};
