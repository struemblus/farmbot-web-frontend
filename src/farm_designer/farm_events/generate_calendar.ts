import { FarmEvent } from "../interfaces";
import {
  parse
} from "later";

/** A dictionary that holds an ISO date as a key and a list of FarmEvent IDs
 * that are scheduled at that point in time.
 * TL;DR: It indexes a FarmEvents ID by date.
 * Example:
 * ```
 *   let x: DateLookup = {
 *     "2099-02-17T18:19:20.000Z": [54, 76]
 *   }
 * ```
 */
interface DateLookup {
  [date: string]: number[] | undefined;
}

export function generateCalendar(input: FarmEvent[]) {
  let eventIdByDate: DateLookup = {};

  let rules = input.map(function (fe) {
    if (fe.time_unit === "never") {
      return fe.start_time;
    } else {
      let { start_time, end_time, repeat, time_unit } = fe;
      let r = parse.recur();
      r = end_time ? r.between(start_time, end_time) : r.startingOn(start_time);
      r = r.every(repeat);
      switch (time_unit) {
        case "minutely": return r.minute();
        case "hourly": return r.hour();
        case "daily": return r.dayOfYear();
        case "weekly": return r.weekOfYear();
        case "monthly": return r.month();
        case "yearly": return r.year();
        default: throw new Error(`${time_unit} is not an expected time_unit`);
      }
    }
  });
  return rules;
}
