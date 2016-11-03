import { createStore } from "redux";
import { Store } from "./interfaces";
import { rootReducer } from "./root_reducer";
import { registerSubscribers } from "./subscribers";
import { getMiddleware } from "./middlewares";

let ENV = process.env.NODE_ENV as string;

function dev() {
    store = createStore(rootReducer,
        JSON.parse(sessionStorage["lastState"] || "{}"),
        getMiddleware("development"));
    // Make store global in dev env in case I need to probe it.
    (window as any)["store"] = store;
    return store;
}

function prod() {
    let x = createStore(rootReducer, ({} as any), getMiddleware("production"));
    return x;
}



function configureStore(options = {}) {
    let store: Store = (ENV === "production" ? prod() : dev());
    registerSubscribers(store);
    return store;
}

export let store = configureStore();
