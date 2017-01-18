import * as React from "react";
import { Link } from "react-router";
import { Everything } from "../interfaces";
import { ScheduledEvent } from "./interfaces";

interface ScheduledEventProps {
  scheduledEvent: ScheduledEvent;
}

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

export class Events extends React.Component<Everything, {}> {
  render() {

    return <div className="panel-container magenta-panel">
      <div className="panel-header magenta-panel">
        <p className="panel-title hidden-xs events-title">
          Events
        </p>
        <div className="panel-tabs hidden-sm hidden-md hidden-lg">
          <ul>
            <li>
              <Link to={"/app/designer?p1=NoTab"}>Designer</Link>
            </li>
            <li>
              <Link to={"/app/designer?p1=Plants"}>Plants</Link>
            </li>
            <li>
              <Link to={"/app/designer?p1=Groups"}>Groups</Link>
            </li>
            <li>
              <Link to={"/app/designer?p1=Zones"}>Zones</Link>
            </li>
            <li>
              <Link to={"/app/designer?p1=Panel2"}
                className="active">
                Calendar
                </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="panel-content">

        <div className="search-box-wrapper">
          <i className="fa fa-search"></i>
          <input className="search" placeholder="Search" />
          <div className="search-underline"></div>
        </div>

        <div className="event-date">No Events Yet</div>

        <Link to="/app/designer?p2=AddEvent">
          <div className="plus-button add-event button-like"
            data-toggle="tooltip" title="Add event">
            <i className="fa fa-2x fa-plus" />
          </div>
        </Link>

      </div>
    </div>;
  }
}
