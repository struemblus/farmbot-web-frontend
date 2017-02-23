import { FarmEvent } from "../interfaces";
import { Everything } from "../../interfaces";
import { FarmEventExecutableData } from "../interfaces";
import * as moment from "moment";

type MomentEventMap = Map<moment.Moment, FarmEvent[]>;

export interface FarmEventProps {
  calendarRows: MomentEventMap;
  push: (url: string) => void;
}
/** Prepares a FarmEvent[] for use with <FBSelect /> */
export function mapStateToProps(state: Partial<Everything>): FarmEventProps {
  let source = state && state.sync && state.sync.farm_events || [];

  let uniqueDatesOnCalendar = _.chain(source)
    .map(x => x.calendar)
    .flatten()
    .uniq()
    .compact()
    .map(moment)
    .value();
  let acc: MomentEventMap = new Map();

  uniqueDatesOnCalendar
    .reduce((accumulator, date, indx) => {
      // TODO: Refactor stringification stuff?
      let schedules = _.where(source, { calendar: [date.toISOString()] });
      if (schedules.length < 1) {
        debugger;
      }
      let x = (accumulator.get(date) || []).concat(schedules || []);
      accumulator.set(date, x);
      accumulator.set(date, _.uniq(accumulator.get(date) || []));
      return accumulator;
    }, acc);


  let whoahDude = _({})
    .pairs()
    .reduce(insertFieldThatIsNamedNextTime, [])
    // .sortBy('next_time')
    .value()
  return {
    calendarRows: [],
    push: (url) => { }
  };
}
