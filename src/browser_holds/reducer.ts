import { generateReducer } from "../generate_reducer";
import { Store } from "redux";
import { Everything } from "../interfaces";

/** Information used to state "why" we don't want you to close the browser
 *  window.*/
interface Lock {
    /** Redux action(s) that can cause the browser to lock unsaved chagnes. */
    lockedWith: string[];
    /** Redux actions that, when fired, will remove the
     *  previously created lock. */
    removedBy: string;
}

const LOCKS: Lock[] = [
    { // REGIMEN EDITOR
        lockedWith: [
            "EDIT_REGIMEN",
            "NEW_REGIMEN",
            "COPY_REGIMEN",
            "COMMIT_BULK_EDITOR"
        ],
        removedBy: "SAVE_REGIMEN_OK"
    }, { // SEQUENCE EDITOR
        lockedWith: [
            "PUSH_STEP",
            "REMOVE_STEP",
            "EDIT_CURRENT_SEQUENCE"
        ],
        removedBy: "SAVE_SEQUENCE_OK"
    }, {
        lockedWith: ["CHANGE_DEVICE", "CHANGE_WEBCAM_URL"],
        removedBy: "REPLACE_DEVICE_ACCOUNT_INFO"
    }
];

/** The locks are stored as key/value pairs. For instance,
 * if there is a hold that can be unlocked via "SAVE_SEQUENCE_OK",
 * the state would be: {SAVE_SEQUENCE_OK: true}  */
export type broswerHoldState = { [actionThatCanRemoveLock: string]: boolean };

/** Subscribe to the store. Before closing the browser window, make sure there
 * aren't any locks left. */
export function dontExitIfBrowserIsOnHold(store: Store) {
    // TODO: Maybe this needs to be middleware?
    function stopThem() { return "You have unsaved work."; }
    function dontStopThem() { }

    store.subscribe(function () {
        let state = store.getState() as Everything;
        let locks = Object.keys(state.browserHolds);
        if (locks.length) {
            window.onbeforeunload = stopThem;
        } else {
            window.onbeforeunload = dontStopThem;
        }
    });
}

/** Returns an new broswerHoldReducer. This exists mostly as a cleanliness 
 * wrapper around the complex logic inside.*/
function newBrowserHoldReducer() {

    let reducer = generateReducer<broswerHoldState>({});

    function addLocker(lock: Lock) {
        lock
            .lockedWith
            .map(function (name) {
                reducer.add(name, function (state, actn) {
                    state[name] = true;
                    return state;
                });
            });
    }

    function addUnlocker(lock: Lock) {
        let willRemove = lock.removedBy;
        reducer.add(willRemove, function (state, a) {
            lock.lockedWith.map(function (name) {
                delete state[name];
            });
            return state;
        });
    }

    LOCKS.map(addLocker);
    LOCKS.map(addUnlocker);
    return reducer;
}

export let broswerHoldReducer = newBrowserHoldReducer();
