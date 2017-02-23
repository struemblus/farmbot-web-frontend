import * as React from "react";
import { Link } from "react-router";
import { Everything } from "../../interfaces";
import { FBSelect, DropDownItem } from "../../ui";
import { connect } from "react-redux";
import { t } from "i18next";
import * as moment from "moment";
import {
  FarmEventExecutableData,
  FinalEventData
} from "../interfaces";
import { mapStateToProps, FarmEventProps } from "./map_state_props";

@connect(mapStateToProps)
export class FarmEvents extends React.Component<FarmEventProps, {}> {

  hasPassed(start_time: string) {
    return start_time < new Date().toISOString();
  }

  /** Attempts to use passed string, if string is undefined defaults to UTC */
  timeOrFallback(start_time: string | undefined) {
    return start_time || moment().utc().toISOString();
  }

  renderEvents(finalEvents: FarmEventExecutableData[]) {
    { /** FarmEventExecutableData includes FarmEvent with exec `type` */ }
    finalEvents.sort(
      (a: FarmEventExecutableData, b: FarmEventExecutableData) => {
        let left = this.timeOrFallback(a.farm_event_data.start_time);
        let right = this.timeOrFallback(b.farm_event_data.start_time);
        return (left > right) ? 1 : 0;
      });

    return finalEvents.map((fe_: FarmEventExecutableData) => {
      let { id, start_time } = fe.farm_event_data;
      let verifiedStartTime = this.timeOrFallback(start_time);

      let hasPassed = this.hasPassed(verifiedStartTime) ? " has-passed" : "";
      return <div className={`farm-event col-xs-12` + hasPassed.toString()}
        key={id}>
        <div className="event-time col-xs-3">
          {moment(verifiedStartTime).format("hh:mma")}
        </div>
        <div className="event-title col-xs-9">
          {fe.executable_data.name || "No name?"}
        </div>
        <Link to={`/app/designer/farm_events/` + (id || "").toString()}>
          <i className="fa fa-pencil-square-o edit-icon"></i>
        </Link>
      </div>;
    });
  }

  renderCalendarRows() {
    return [].map((evt: FinalEventData) => {
      return <div className="farm-event-wrapper col-xs-12"
        key={evt.date}>

        <div className="farm-event-date col-xs-2">
          <div className="farm-event-date-month">
            {/** i.e. `Feb` */}
            {moment(evt.date.toString()).format("MMM")}
          </div>
          <div className="farm-event-date-day">
            {/** i.e. `14` */}
            {moment(evt.date.toString()).format("DD")}
          </div>
        </div>

        <div className="col-xs-10 events">
          {this.renderEvents(evt.finalEvents)}
        </div>
      </div>;
    })
  }
  render() {
    let { push } = this.props.router;

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
          <i className="col-xs-2 fa fa-calendar"></i>

          <div className="col-xs-10">
            <FBSelect dropDownItems={selectItems}
              onChange={(selectedOption) => {
                push("/app/designer/farm_events/" + selectedOption.value);
              }}
            />
          </div>

          <div className="farm-events row">
            {/** Includes unique date and associated events */}
            {}
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
