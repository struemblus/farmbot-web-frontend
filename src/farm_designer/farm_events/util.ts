import { TaggedFarmEvent } from "../../resources/tagged_resources";
import { GetState } from "../../redux/interfaces";
import { findRegimenById } from "../../resources/selectors";
import * as moment from "moment";

export function maybeWarnAboutMissedTasks(tfe: TaggedFarmEvent, cb: Function) {
  return function (dispatch: Function, getState: GetState) {
    let state = getState();
    let fe = tfe.body;
    // STEP 1: Only do this check if it is a Regimen - sequences don't matter.
    if (fe.executable_type === "Regimen") {
      const START_TIME = moment(fe.start_time);
      const NOW = moment();
      const MIDNIGHT = NOW.subtract(1, 'days').startOf('day');
      const LOL_STRINGS = "MM-DD-YYYY";
      // Step 2.5 Continue checking if the farm event is supposed to run today.
      //          since running a farmevent the day it is scheduled runs a risk
      //          of missed tasks.

      debugger;
      if (START_TIME.format(LOL_STRINGS) === NOW.format(LOL_STRINGS)) {
        // STEP 2: Grab all the rgimen items and then...
        let reg_items = findRegimenById(state.resources.index, fe.executable_id)
          .body
          .regimen_items;
        const TIME_OFFSET: keyof typeof reg_items[0] = "time_offset";
        // ... Figure out when the first event runs....
        let first = _(reg_items).pluck<number>(TIME_OFFSET).min() || 0;
        /** This is the first task time for the whole series of events. */
        const FIRST_TASK = MIDNIGHT.add(first, "milliseconds");

        // STEP 3: If task loss is possible, warn the user by calling CB.
        if (FIRST_TASK.diff(NOW) < 0) {
          // I think this one will trigger.
          console.log("THE TOP ONE IS HERE");
        } else {
          console.log("BOTTOM ONE IS HERE.");
        }
      }
    }
  }
}
