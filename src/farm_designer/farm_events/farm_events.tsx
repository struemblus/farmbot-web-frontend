import * as React from "react";
import { Link } from "react-router";
import { Everything } from "../../interfaces";
import { Select } from "../../ui";
import { connect } from "react-redux";
import { t } from "i18next";
import * as moment from "moment";
import { FarmEventExecutableData } from "../interfaces";

@connect((state: Everything) => state)
export class FarmEvents extends React.Component<Everything, {}> {

  hasPassed(date: Date) { return date < new Date(); }

  render() {
    let farmEvents = this.props.sync.farm_events || [];
    let eventsWithExecutableData: FarmEventExecutableData[] = [];
    /** Merging the data needed from the correlating executable, refactor? */
    farmEvents.map(
      (farmEvent: FarmEventExecutableData) => {
        switch (farmEvent.executable_type) {
          // If type `regimen`
          case "Regimen":
            this.props.regimens.all.map(regimen => {
              // Search all regimens and match id
              if (regimen.id === farmEvent.executable_id) {
                farmEvent.executable_data = { name: regimen.name };
                eventsWithExecutableData.push(farmEvent);
              }
            });
            break;
          case "Sequence":
            // If type `sequence`
            this.props.sequences.all.map(sequence => {
              // Search all sequences and match id
              if (sequence.id === farmEvent.executable_id) {
                farmEvent.executable_data = { name: sequence.name };
                eventsWithExecutableData.push(farmEvent);
              }
            });
            break;
          default:
            throw new Error("Something went wrong with events.");
        }
      });

    return <div className="panel-container magenta-panel">
      <div className="panel-header magenta-panel">
        <div className="panel-tabs">
          <Link to="/app/designer" className="mobile-only">
            {t("Designer")}
          </Link>
          <Link to="/app/designer/plants">
            {t("Plants")}
          </Link>
          <Link to="/app/designer/farm_events" className="active">
            {t("Farm Events")}
          </Link>
        </div>
      </div>

      <div className="panel-content events">

        <div className="row">
          <i className="col-sm-2 col-md-2 fa fa-calendar"></i>

          <Select className="col-sm-10 col-md-10"
            options={[]} />

          <div className="farm-events col-sm-12">
            {eventsWithExecutableData.map((farmEvent: FarmEventExecutableData) => {
              return <div className="farm-event col-sm-12" key={farmEvent.id}>
                <div className="event-time col-sm-3">
                  {moment(farmEvent.start_time).format("hha")}
                </div>
                <div className="event-title col-sm-9">
                  {farmEvent.executable_data.name || "No name?"}
                </div>
                <Link to={`/app/designer/farm_events/${farmEvent.id}`}>
                  <i className="fa fa-pencil-square-o edit-icon"></i>
                </Link>
              </div>;
            })}
          </div>

        </div>

        <Link to="/app/designer/farm_events/add">
          <div className="plus-button add-event button-like"
            data-toggle="tooltip" title="Add event">
            <i className="fa fa-2x fa-plus" />
          </div>
        </Link>

      </div>
    </div>;
  }
}
