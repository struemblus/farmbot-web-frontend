import { FarmEvent } from "../interfaces";
import { Everything } from "../../interfaces";
import * as moment from "moment";
import { Sequence } from "../../sequences/interfaces";
import { Regimen } from "../../regimens/interfaces";
import { Dictionary } from "farmbot";

interface CalendarOccurrence {
  sortKey: number;
  hour: number;
  minute: number;
  ampm: string;
  executableName: string;
  executableId: number;
}

interface CalendarDay {
  sortKey: number;
  month: string;
  day: number;
  items: CalendarOccurrence[];
}


export interface FarmEventProps {
  /** Sorted list of the first (100?) events due on the calnedar. */
  calendarRows: CalendarDay[];
  /** Call this function to navigate to different pages. */
  push: (url: string) => void;
}

/** Stub object to handle fallback values. If you see this in production,
 * something went wrong. */
const NULL = { name: "NO NAME@", executable_type: "@NO TYPE" };

/** Prepares a FarmEvent[] for use with <FBSelect /> */
export function mapStateToProps(state: Partial<Everything>): FarmEventProps {
  let source = state && state.sync && state.sync.farm_events || [];
  let sequences = state && state.sync && state.sync.sequences || [];
  let regimens = state && state.sync && state.sync.regimens || [];
  let everyDate = _.chain(source)
    .map(x => x.calendar || [])
    .flatten()
    .uniq()
    .compact()
    .value() as string[];
  let sequenceById: Dictionary<Sequence | undefined> = _.indexBy(sequences, "id");
  let regimenById: Dictionary<Regimen | undefined> = _.indexBy(regimens, "id");
  let farmEventsByDate = indexByCalendarDate(everyDate, source);
  let farmEventsByMMDD = indexByCalendarMMDD(everyDate, source);
  let crazyIdea = indexByMMDDandDate(everyDate, source);
  function indexByMMDDandDate(dates: string[], source: FarmEvent[]): { [mmdd: string]: CalendarOccurrence[] } {
    let calOccurrByMMDD: { [mmdd: string]: CalendarOccurrence[] } = {};
    dates.map(function (date) {
      let m = moment(date);
      let mmdd = m.format("MMDD");
      source.map(function (farmEvent) {
        let executableId = farmEvent.executable_id;
        let executableName: string;
        switch (farmEvent.executable_type) {
          case "Sequence":
            let s = sequenceById[executableId];
            executableName = (s && s.name) || "Unknown sequence";
            break;
          case "Regimen":
            let r = regimenById[executableId];
            executableName = (r && r.name) || "Unknown regimen";
            break;
          default: throw new Error("Never");
        }
        let calOccurr = {
          sortKey: m.unix(),
          hour: m.hour(),
          minute: m.minutes(),
          ampm: m.format("a"),
          executableName,
          executableId,
        };
        if (calOccurrByMMDD[mmdd]) {
          calOccurrByMMDD[mmdd].push(calOccurr);
        } else {
          calOccurrByMMDD[mmdd] = [calOccurr];
        }
      });
    });
    return calOccurrByMMDD;
  }

  let calendarRows: CalendarDay[] = everyDate
    .map(function (date) {
      let m = moment(date);
      let mmdd = m.format("MMDD");
      let items = (farmEventsByMMDD[mmdd] || []).map(function (farmEvent) {

        return {
          sortKey: number;
          hour: number;
          minute: number;
          ampm: string;
          executableName: string;
          executableId: number;
        };
      })
      return {
        sortKey: m.unix(),
        month: m.format("MMM"),
        day: m.day(),
        items
      };
    });
  let push = (state && state.router && state.router.push) || (() => { });
  return { calendarRows, push };
}

/** I'm really sorry you have to see this. */
function indexByCalendarDate(dates: string[], source: FarmEvent[]) {
  let eventsByDate: Dictionary<FarmEvent[]> = {};
  dates.map(function (date) {
    source.map(function (farmEvent) {
      if (eventsByDate[date]) {
        eventsByDate[date].push(farmEvent);
      } else {
        eventsByDate[date] = [farmEvent];
      }
    });
  });
  return eventsByDate;
}

function indexByMMDD(dates: string[], source: FarmEvent[]) {
  let eventsByDate: Dictionary<FarmEvent[]> = {};
  dates.map(function (date) {
    let mmdd = moment(date).format("MMDD");
    source.map(function (farmEvent) {
      if (eventsByDate[mmdd]) {
        eventsByDate[mmdd].push(farmEvent);
      } else {
        eventsByDate[mmdd] = [farmEvent];
      }
    });
  });
  return eventsByDate;
}

// If the .map() implementation is too slow:
  // for (let i = 0; i < dates.length; i++) {
  //   let date = dates[i];
  //   for (let j = 0; j < source.length; j++) {
  //     let farmEvent = source[j];
  //     if (eventsByDate[date]) {
  //       eventsByDate[date].push(farmEvent);
  //     } else {
  //       eventsByDate[date] = [farmEvent];
  //     }
  //   }
  // }

