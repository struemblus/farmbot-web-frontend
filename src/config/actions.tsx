import { didLogin } from "../auth/actions";
import { AuthState } from "../auth/interfaces";
import { ReduxAction, Thunk } from "../redux/interfaces";
import { ChangeApiHost, ChangeApiPort } from "./interfaces";
import { API } from "../api";

export function changeApiHost(host: string): ReduxAction<ChangeApiHost> {
  return { type: "CHANGE_API_HOST", payload: { host } };
};

export function changeApiPort(port: string): ReduxAction<ChangeApiPort> {
  return { type: "CHANGE_API_PORT", payload: { port } };
};

/** Lets Redux know that the app is ready to bootstrap. */
export function ready(): Thunk {
  return (dispatch, getState) => {
    debugger;
    /** Token that may or may not be stored in localStorage from previous
     * user session. */
    let t: string | undefined = localStorage["token"];
    let state: AuthState = t ? JSON.parse(t) : (getState().auth || {});
    let hasToken = state.token && state.token.length > 30;
    if (hasToken) { didLogin(state, dispatch); };
  };
}
