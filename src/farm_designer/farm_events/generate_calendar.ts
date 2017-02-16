import { FarmEvent } from "../interfaces";
import * as wow from "later";

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
  [date: string]: FarmEvent[] | undefined;
}

function putEventIntoCalendarMap(target: DateLookup,
  date: string,
  item: FarmEvent): void {
  let dateList = target[date] || (target[date] = []);
  dateList.push(item);
  target[date] = _.uniq(dateList, "id");
}

export function generateCalendar(input: FarmEvent[]) {
  let calendar: DateLookup = {};
  input.map(function (fe) {
    if (fe.time_unit === "never") {
      putEventIntoCalendarMap(calendar, fe.start_time, fe);
    } else {
    }
  });
}
