import thunk from "redux-thunk";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from "redux";
import { authReducer as auth } from "./auth/reducer";
import { sequenceReducer as sequences } from "./sequences/reducer";
import { botReducer as bot } from "./devices/reducer";
import { configReducer as config } from "./config/reducer";
import { routerReducer as routing } from "react-router-redux";
import { regimensReducer as regimens } from "./regimens/reducer";
import { tickerReducer as ticker } from "./ticker/reducer";
import { draggableReducer as draggable } from "./draggable/reducer";
import { dontExitIfBrowserIsOnHold } from "./browser_holds/index";
import { designer } from "./farm_designer/reducer";
import { Everything, ReduxAction } from "./interfaces";
import {
  BulkSchedulerReducer as bulkScheduler
} from "./regimens/bulk_scheduler/reducer";
import { success } from "./logger";
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
  draggable
});

let rootReducer = function (state: Everything | undefined | {},
  action: ReduxAction<{}>) {
  if (action.type === "LOGOUT") {
    success("You have been logged out.");
    return state = {};
  }
  return reducers(state, action);
};

function configureStore(options = {}) {
  let store: Redux.Store;
  if (process.env.NODE_ENV !== "production") {
    let lastState = JSON.parse(sessionStorage["lastState"] || "{}");
    let dt = (window as any)["devToolsExtension"];
    let risi = require("redux-immutable-state-invariant")();
    let srsly = compose(applyMiddleware(thunk, risi),
      dt ? dt() : (f: any) => f);
    store = createStore(reducers, lastState, srsly);
    // Make store global in dev env in case I need to probe it.
    (window as any)["store"] = store;
    store.subscribe(function () {
      sessionStorage["lastState"] = JSON.stringify(store.getState());
    });
  } else {
    store = createStore(rootReducer, {}, applyMiddleware(thunk));
  };
  dontExitIfBrowserIsOnHold(store);
  return store;
}

export let store = configureStore();
