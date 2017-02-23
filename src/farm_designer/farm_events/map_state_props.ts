import { FarmEvent } from "../interfaces";
import { Everything } from "../../interfaces";
import * as moment from "moment";
import { Sequence } from "../../sequences/interfaces";
import { Regimen } from "../../regimens/interfaces";
import { Dictionary } from "farmbot";

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

const NULL = { name: "NO NAME", executable_type: "NO TYPE" };

/** Prepares a FarmEvent[] for use with <FBSelect /> */
export function mapStateToProps(state: Partial<Everything>): FarmEventProps {
  let source = state && state.sync && state.sync.farm_events || [];
  let sequences = state && state.sync && state.sync.sequences || [];
  let regimens = state && state.sync && state.sync.regimens || [];
  let sequenceById: Dictionary<Sequence | undefined> = _.indexBy(sequences, "id");
  let regimenById: Dictionary<Regimen | undefined> = _.indexBy(regimens, "id");

  function inferExecutableName(farm_events: FarmEvent[]) {
    let fe = farm_events[0] || NULL;
    switch (fe.executable_type) {
      case "Sequence": return (sequenceById[fe.executable_id] || NULL).name;
      case "Regimen": return (regimenById[fe.executable_id] || NULL).name;
      default: return "nothing";
    }
  }

  let calendarRows: CalendarRow[] = [];
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
      calendarRows.push({
        timestamp: time.unix(),
        month: time.format("MMM"),
        day: time.format("D"),
        executableName: inferExecutableName(list),
        list
      });

    });

  calendarRows = _.sortBy(calendarRows, "timestamp").slice(1, 100);

  return {
    calendarRows,
    push: (url) => { }
  };
}
