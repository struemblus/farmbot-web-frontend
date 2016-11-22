import { authReducer as auth } from "../auth/reducer";
import { sequenceReducer as sequences } from "../sequences/reducer";
import { botReducer as bot } from "../devices/reducer";
import { peripheralReducer as peripherals } from "../controls/peripherals/reducer";
import { configReducer as config } from "../config/reducer";
import { routerReducer as routing } from "react-router-redux";
import { regimensReducer as regimens } from "../regimens/reducer";
import { tickerReducer as ticker } from "../ticker/reducer";
import { draggableReducer as draggable } from "../draggable/reducer";
import { toolsReducer as tools } from "../tools/reducer";
import { syncReducer as sync } from "../sync/reducer";
import { designer } from "../farm_designer/reducer";
import {
    BulkSchedulerReducer as bulkScheduler
} from "../regimens/bulk_scheduler/reducer";
import { combineReducers } from "redux";
import { Everything } from "../interfaces";
import { ReduxAction } from "./interfaces";
import { success } from "../logger";
let reducers = combineReducers({
    routing,
    auth,
    bot,
    sequences,
    regimens,
    bulkScheduler,
    config,
    designer,
    ticker,
    draggable,
    peripherals,
    tools,
    sync
});

/** This is the topmost reducer in the application. If you need to preempt a
 * "normal" reducer (eg: globally capture `LOGOUT` action) this is the place to
 *  do it */
export function rootReducer(state: any,
    action: ReduxAction<{}>) {
    if (action.type === "LOGOUT") {
        state = { routing: state.routing };
    }
    return reducers(state, action);
};
