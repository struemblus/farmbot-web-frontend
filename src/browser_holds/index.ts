import { Store } from "../redux/interfaces";

function hasUnsavedChanges(store: Store) {
    // Kind of a funny alternative to tree traversal, but I think it is easier
    // to debug and probably faster than using LoDash, since it is a native API.
    let state = JSON.stringify(store.getState()) || "";
    return (state
        .replace(" ", "")
        .indexOf('"dirty":true') !== -1);
}
function stopThem() { return "You have unsaved work."; }
function dontStopThem() { }

/** Subscribe to the store. Stop the user from exiting if any part of the
 * state tree contains `dirty: true`. */
export function dontExitIfBrowserIsOnHold(store: Store) {
    store.subscribe(function () {
        let unsavedWork = hasUnsavedChanges(store);
        window.onbeforeunload = (unsavedWork) ? stopThem : dontStopThem;
    });
}
