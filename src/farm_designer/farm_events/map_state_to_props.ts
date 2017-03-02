import { FarmEvent } from "../interfaces";
import { Everything } from "../../interfaces";
import * as moment from "moment";
import { Sequence } from "../../sequences/interfaces";
import { Regimen } from "../../regimens/interfaces";
import { Dictionary } from "farmbot";

const MONTHS: Readonly<Dictionary<string>> = {
  "12": "Dec",
  "11": "Nov",
  "10": "Oct",
  "09": "Sep",
  "08": "Aug",
  "07": "Jul",
  "06": "Jun",
  "05": "May",
  "04": "Apr",
  "03": "Mar",
  "02": "Feb",
  "01": "Jan"
}

interface CalendarOccurrence {
  sortKey: number;
  timeStr: string;
  executableName: string;
  executableId: number;
  id: number;
}

interface CalendarDay {
  sortKey: string;
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
  let push = (state && state.router && state.router.push) || (() => { });
  let everyDate = _.chain(source)
    .map(x => x.calendar || [])
    .flatten()
    .uniq()
    .compact()
    .value() as string[];
  let sequenceById: Dictionary<Sequence | undefined> = _.indexBy(sequences, "id");
  let regimenById: Dictionary<Regimen | undefined> = _.indexBy(regimens, "id");
  let farmEventsByDate = indexByCalendarDate(everyDate, source);
  // let farmEventsByMMDD = indexByCalendarMMDD(everyDate, source);
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
          timeStr: m.format("hh:mm a"),
          id: farmEvent.id || 0,
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

  let calendarRows: CalendarDay[] = _(everyDate)
    .map(x => moment(x).format("MMDD"))
    .uniq()
    .map(function (mmdd) {
      let items = crazyIdea[mmdd];
      return {
        sortKey: mmdd,
        month: MONTHS[mmdd.slice(0, 2)] || "???",
        day: parseInt(mmdd.slice(2, 4)),
        items
      };
    })
    .value();
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

