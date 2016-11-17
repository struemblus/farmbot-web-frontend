import { didLogin } from "../auth/actions";
import { AuthState } from "../auth/interfaces";
import { ReduxAction, Thunk } from "../redux/interfaces";
import { ChangeApiHost, ChangeApiPort } from "./interfaces";
import { Session } from "../session";

export function changeApiHost(host: string): ReduxAction<ChangeApiHost> {
  return { type: "CHANGE_API_HOST", payload: { host } };
};

export function changeApiPort(port: string): ReduxAction<ChangeApiPort> {
  return { type: "CHANGE_API_PORT", payload: { port } };
};

/** Lets Redux know that the app is ready to bootstrap. */
export function ready(): Thunk {
  return (dispatch, getState) => {
    let state = Session.get() || getState().auth;
    if (state) { didLogin(state, dispatch); };
  };
}
