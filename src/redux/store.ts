import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import { Store } from "./interfaces";
import { rootReducer } from "./root_reducer";
import { registerSubscribers } from "./subscribers";

let ENV = process.env.NODE_ENV as string;

/** Business logic that creates the Redux store in dev env.
 * Most of this is adding dev tools and other helpers. */
function dev() {
    let lastState = JSON.parse(sessionStorage["lastState"] || "{}");
    let dt = (window as any)["devToolsExtension"];
    let risi = require("redux-immutable-state-invariant")();
    let srsly = compose(applyMiddleware(thunk, risi),
        dt ? dt() : (f: any) => f);
    store = createStore(rootReducer, lastState, srsly);
    // Make store global in dev env in case I need to probe it.
    (window as any)["store"] = store;
    store.subscribe(function() {
        sessionStorage["lastState"] = JSON.stringify(store.getState());
    });
    return store;
}

function prod() {
    return createStore(rootReducer, {}, applyMiddleware(thunk));
}

function configureStore(options = {}) {
    let store: Store = (ENV === "production" ? prod() : dev());
    registerSubscribers(store);
    return store;
}

export let store = configureStore();
