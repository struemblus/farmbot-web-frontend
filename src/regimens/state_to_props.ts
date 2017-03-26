import { Everything } from "../interfaces";
import { Props, RegimenItem, RegimenItemCalendarRow, CalendarRow } from "./interfaces";
import {
  selectAllSequences,
  selectAllRegimens,
  maybeGetSequence,
  maybeGetRegimen,
  findId,
  findSequence
} from "../resources/selectors";
import { TaggedRegimen } from "../resources/tagged_resources";
import { duration } from "moment";
import * as moment from "moment";
import { ResourceIndex } from "../resources/interfaces";
import { randomColor } from "../util";
export function mapStateToProps(props: Everything): Props {
  let { resources, dispatch, bot } = props;
  let { weeks, dailyOffsetMs, selectedSequenceUUID, currentRegimen } =
    resources.consumers.regimens;
  let { index } = resources;
  let current = maybeGetRegimen(index, currentRegimen);
  let calendar = current ?
    generateCalendar(current, index, dispatch) : [];

  return {
    dispatch: props.dispatch,
    sequences: selectAllSequences(index),
    resources: index,
    auth: props.auth,
    current,
    regimens: selectAllRegimens(index),
    selectedSequence: maybeGetSequence(index, selectedSequenceUUID),
    dailyOffsetMs,
    weeks,
    bot,
    calendar
  };
}

/** Does all the heavy lifting related to joining regimen items with their
 * appropriate sequence meta data like "sequence name" and the like.
 */
function generateCalendar(regimen: TaggedRegimen,
  index: ResourceIndex,
  dispatch: Function): CalendarRow[] {
  let rows = regimen.body.regimen_items.map(createRows(index, dispatch));
  let dict = _.groupBy(rows, "day");
  let days = Object.keys(dict).sort();
  let mapper = (day: string): CalendarRow => ({ day: day, items: dict[day] });
  return days.map(mapper);
}

/** Formatting of calendar row dates. */
const FMT = "h:mm a";

let createRows = (index: ResourceIndex, dispatch: Function) =>
  (item: RegimenItem): RegimenItemCalendarRow => {
    let uuid = findId(index, "sequences", item.sequence_id);
    let sequence = findSequence(index, uuid);
    let { time_offset } = item;
    let d = duration(time_offset);
    let { name, color } = sequence.body;
    let hhmm = moment({ hour: d.hours(), minute: d.minutes() }).format(FMT);
    let day = Math.round(duration(time_offset).asDays());
    return { name, hhmm, color: color || randomColor(), day, dispatch };
  }

