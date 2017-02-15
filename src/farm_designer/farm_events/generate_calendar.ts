import { FarmEvent } from "../interfaces";
import * as L from "later";

interface Calendar {

}

export function generateCalendar(input: FarmEvent[]) {
  // TODO!
  let rules = input.map(function (fe) {
    let x = L.parse.recur().every(fe.repeat);
    return
  });
  return [{}];
}
