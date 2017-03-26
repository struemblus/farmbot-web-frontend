import { ReduxAction, Thunk } from "../../redux/interfaces";
import { SetTimeOffsetProps, ToggleDayParams } from "./interfaces";
import { assertUuid } from "../../resources/selectors";

export function pushWeek() {
  return {
    type: "PUSH_WEEK"
  };
}

export function popWeek() {
  return {
    type: "POP_WEEK"
  };
}

const MINUTES_MS = 1000 * 60;
const HOURS_MS = MINUTES_MS * 60;

/** Sets daily offset of a regimen */
export function setTimeOffset({ hours, minutes }: SetTimeOffsetProps) {
  // let milliseconds = [hours * HOURS_MS, minutes * MINUTES_MS]
  //   .reduce((num, acc) => num + acc);

  // if (_.isNaN(milliseconds) || !_.isNumber(milliseconds)) {
  //   let m = "Time is not properly formatted.";
  //   warning(m, "Bad Input");
  //   return {
  //     type: "TIME_OFFSET_ERROR",
  //     payload: 0
  //   };

  // } else {
  return {
    type: "SET_TIME_OFFSET",
    payload: [] // bulk_scheduler/actions.ts
  };
  // };
}

export function toggleDay({ week, day }: ToggleDayParams) {
  return {
    type: "TOGGLE_DAY",
    payload: {
      week,
      day
    }
  };
}

export function setSequence(uuid: string): ReduxAction<string> {
  assertUuid("sequences", uuid);
  return {
    type: "SET_SEQUENCE",
    payload: uuid
  };
};

export function commitBulkEditor(): Thunk {

  return function (dispatch, getState) {
    // const state: Everything = getState();

    // if (!state.regimens.current) { dispatch(newRegimen()); }

    // if (state.bulkScheduler.sequence) {
    //   let index = getState().regimens.current;
    //   const regimenItems = groupRegimenItemsByWeek(
    //     state.bulkScheduler.form.weeks,
    //     state.bulkScheduler.form.dailyOffsetMs,
    //     state.bulkScheduler.sequence.body);
    dispatch({
      type: "COMMIT_BULK_EDITOR",
      payload: {} //{ regimenItems, index }
    });
    // } else {
    //   error(t("Select a sequence from the dropdown first."));
    // }
  };
}
