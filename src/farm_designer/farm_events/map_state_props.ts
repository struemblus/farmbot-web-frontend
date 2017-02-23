import { FarmEvent } from "../interfaces";
import { Everything } from "../../interfaces";
import { FarmEventExecutableData } from "../interfaces";
import * as moment from "moment";
import { Sequence } from "../../sequences/interfaces";
import { Regimen } from "../../regimens/interfaces";
// import { Dictionary } from "farmbot";

export interface FarmEventProps {
  calendarRows: CalendarRow[];
  push: (url: string) => void;
}

interface CalendarRow {
  day: string;
  month: string;
  list: FarmEvent[];
  executableName: string;
  /** Used for the purpose of sorting. */
  timestamp: number;
}

/** Prepares a FarmEvent[] for use with <FBSelect /> */
export function mapStateToProps(state: Partial<Everything>): FarmEventProps {
  let source = state && state.sync && state.sync.farm_events || [];
  let sequences = state && state.sync && state.sync.sequences || [];
  let regimens = state && state.sync && state.sync.regimens || [];
  let sequenceById = _.indexBy(sequences, "id");
  let regimenById = _.indexBy(regimens, "id");

  function inferExecutableName(farm_events: FarmEvent[]) {
    let fe = farm_events[0];
    if (fe) {
      switch (fe.executable_type) {
        case "Sequence":
          return sequenceById[fe.executable_id].name;
        case "Regimen":
          return regimenById[fe.executable_id].name;
      }
    } else {
      return "Nothing";
    }
  }

  let calendarRows: CalendarRow[] = [];

  let lastThing = "";
  try {
    _.chain(source)
      .map(x => x.calendar)
      .flatten()
      .uniq()
      .compact()
      .map((str: string) => moment(str))
      .value()
      .reduce((accumulator, date, indx) => {
        // TODO: Refactor stringification stuff?
        let schedules = _.select(source, function (x) {
          return (x.calendar || []).includes(date.toISOString());
        });
        let x = (accumulator.get(date) || []).concat(schedules || []);
        accumulator.set(date, x);
        accumulator.set(date, _.uniq(accumulator.get(date) || []));
        return accumulator;
      }, (new Map<moment.Moment, FarmEvent[]>()))
      .forEach(function (list, time) {

        return {
          timestamp: time.unix(),
          month: time.month(),
          day: time.day(),
          name: inferExecutableName(list),
          list
        };

      });
  } catch (e) {
    let qqq = lastThing;
    debugger;
  } finally {
    debugger;
    console.log("wat");
  }

  calendarRows = _.sortBy(calendarRows, "timestamp");

  return {
    calendarRows,
    push: (url) => { }
  };
}
