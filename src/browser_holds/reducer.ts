import { generateReducer } from "../generate_reducer";
import { Store } from "redux";
import { Everything } from "../interfaces";

interface Lock {
    lockedWith: string[];
    removedBy: string;
}

const LOCKS: Lock[] = [
    { // REGIMEN EDITOR
        lockedWith: ["EDIT_REGIMEN", "NEW_REGIMEN",
            "EDIT_CURRENT_SEQUENCE"],
        removedBy: "SAVE_SEQUENCE_OK"
    }, { // SEQUENCE EDITOR
        lockedWith: ["PUSH_STEP", "REMOVE_STEP"],
        removedBy: "SAVE_REGIMEN_OK"
    }, {
        lockedWith: ["CHANGE_DEVICE", "CHANGE_WEBCAM_URL"],
        removedBy: "REPLACE_DEVICE_ACCOUNT_INFO"
    }
];

export type broswerHoldState = { [name: string]: boolean };

// TODO: Maybe this needs to be middleware?
export function dontExitIfBrowserIsOnHold(store: Store) {

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
