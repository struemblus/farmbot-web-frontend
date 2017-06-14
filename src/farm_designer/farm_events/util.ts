import { TaggedFarmEvent } from "../../resources/tagged_resources";
import { GetState } from "../../redux/interfaces";
import { findRegimenById } from "../../resources/selectors";
import * as moment from "moment";
import { FarmEvent } from "../interfaces";
import { RegimenItem } from "../../regimens/interfaces";

export function maybeWarnAboutMissedTasks(tfe: TaggedFarmEvent, cb: Function) {
  return function (dispatch: Function, getState: GetState) {
    let state = getState();
    let fe = tfe.body;
    // STEP 1: Only do this check if it is a Regimen - sequences don't matter.
    if (fe.executable_type === "Regimen") {
      // let NOW = new Date().toString().slice(0, 11).trim();
      // let START_TIME = new Date(fe.start_time).toString().slice(0, 11).trim();
      var NOW = moment();
      var START_TIME = moment(fe.start_time);
      var MIDNIGHT = NOW.clone().subtract(1, 'days').startOf('day');
      let LOLSTRING = "YYYY-MM-DD";

      // Step 2.5 Continue checking if the farm event is supposed to run today.
      //          since running a farmevent the day it is scheduled runs a risk
      //          of missed tasks.

      if (START_TIME.format(LOLSTRING) === NOW.format(LOLSTRING)) {
        // STEP 2: Grab all the rgimen items and then...
        let regItems = findRegimenById(state.resources.index, fe.executable_id)
          .body
          .regimen_items;
        const TIME_OFFSET: keyof typeof regItems[0] = "time_offset";
        // ... Figure out when the first event runs....
        let first = _(regItems).pluck<number>(TIME_OFFSET).min() || 0;
        /** This is the first task time for the whole series of events. */
        const FIRST_TASK = MIDNIGHT.add(first, "milliseconds");

        // STEP 3: If task loss is possible, warn the user by calling CB.
        if (FIRST_TASK.diff(NOW) < 0) {
          cb();
        }
      }
    }
  }
}

console.info("TODO - RC")
const timeFmt = "YYYY-MM-DD";

export function taskLossIsPossible(fe: FarmEvent,
  regItems: RegimenItem[],
  now = moment()) {
  var START_TIME = moment(fe.start_time);
  var MIDNIGHT = now.clone().subtract(1, 'days').startOf('day');


  if (fe.executable_type === "Regimen") {
    // Step 2.5 Continue checking if the farm event is supposed to run today.
    //          since running a farmevent the day it is scheduled runs a risk
    //          of missed tasks.

    if (START_TIME.format(timeFmt) === now.format(timeFmt)) {
      // STEP 2: Grab all the rgimen items and then...
      const TIME_OFFSET: keyof typeof regItems[0] = "time_offset";
      // ... Figure out when the first event runs....
      let first = _(regItems).pluck<number>(TIME_OFFSET).min() || -1;
      if (first > -1) {
        /** This is the first task time for the whole series of events. */
        const FIRST_TASK = MIDNIGHT.add(first, "milliseconds");

        // STEP 3: If task loss is possible, warn the user by calling CB.
        if (FIRST_TASK.diff(now) < 0) {
          return true;
        }
      }
    }
    return false;
  }
}
