import * as React from "react";
import { Link } from "react-router";
import { Everything } from "../../interfaces";
import { Select } from "../../ui";
import { connect } from "react-redux";
import { ScheduledEventProps } from "../interfaces";
import { t } from "i18next";

export class ScheduleEvent extends React.Component<ScheduledEventProps, {}> {

  hasPassed(date: Date) { return date < new Date(); }

  formatTime(date: Date) {
    let hours = date.getHours();
    return `${hours} ${(hours > 12) ? "a" : "p"}`;
  }

  render() {
    let evnt = this.props.scheduledEvent;
    let isPassed = this.hasPassed(evnt.time) ? "past" : "";

    return <div className={`event ${isPassed}`}>
      <div className="event-time">
        {this.formatTime(evnt.time)}
      </div>
      <div className="event-title">{evnt.desc}</div>
    </div>;
  }
}

@connect((state: Everything) => state)
export class FarmEvents extends React.Component<Everything, {}> {
  render() {
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
            options={[{ label: "January 1", value: 1 }]} />
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
