import * as React from "react";
import { Link } from "react-router";
import { Plant } from "../interfaces";
import { Everything } from "../../interfaces";
import { Select } from "../../ui";
import { ICONS } from "../icons";

const pathname = "/app/designer";

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
    return <div className="panel-container green-panel">
      <div className="panel-header green-panel">
        <div className="panel-tabs">
          <ul>
            <li>
              <Link to="plants"
                className={"active"}>
                Plants
              </Link>
            </li>
            <li>
              <Link to="events">
                Events
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="panel-content">
        // Select here

        <div className="object-list current-plants">
          <label>Current Plants</label>
          <ul className="row">

            <li draggable={true} onDragStart={this.dragstart_handler}
              id="tomato" className="col-sm-6 col-md-6 col-xs-6">
              <Link to={{
                pathname: "/app/designer",
                query: { p1: "PlantInfo", id: "tomato" }
              }}>
                <label>Tomato</label>
                <img src="/app-resources/img/icons/Tomato-96.png" alt="" />
              </Link>
            </li>

            <li draggable={true} onDragStart={this.dragstart_handler}
              id="avacado" className="col-sm-6 col-md-6 col-xs-6">
              <Link to={{
                pathname: "/app/designer",
                query: { p1: "PlantInfo", id: "tomato" }
              }}>
                <label>Avacado</label>
                <img src="/app-resources/img/icons/Avocado-96.png" alt="" />
              </Link>
            </li>

            <li draggable={true} onDragStart={this.dragstart_handler}
              id="apple" className="col-sm-6 col-md-6 col-xs-6">
              <Link to={{
                pathname: "/app/designer",
                query: { p1: "PlantInfo", id: "apple" }
              }}>
                <label>Apple</label>
                <img src="/app-resources/img/icons/Apple-96.png" alt="" />
              </Link>
            </li>

            <li draggable={true} onDragStart={this.dragstart_handler}
              id="barley" className="col-sm-6 col-md-6 col-xs-6">
              <Link to={{
                pathname: "/app/designer",
                query: { p1: "PlantInfo", id: "barley" }
              }}>
                <label>Barley</label>
                <img src="/app-resources/img/icons/Barley-96.png" alt="" />
              </Link>
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
