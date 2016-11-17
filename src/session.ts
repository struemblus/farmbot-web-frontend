import { AuthState } from "./auth/interfaces";
import { box } from "boxed_value";


export namespace Session {
    const KEY = "session";

    /** Replace the contents of session storage. */
    export function put(nextState: AuthState) {
        localStorage[KEY] = JSON.stringify(nextState);
    }

    /** Fetch the previous session. */
    export function get(): AuthState | undefined {
        try {
            let v: AuthState = JSON.parse(localStorage[KEY]);
            if (box(v).kind === "object") {
                return v;
            } else {
                throw new Error("Expected object or undefined");
            }
        } catch (error) {
            clear();
        };
    }

    /** clear localstorage and sessionstorage*/
    export function clear() {
        console.warn("Clearing session storage.");
        localStorage.clear();
        sessionStorage.clear();
    }
}
