import { didLogin } from "../auth/actions";
import { AuthState } from "../auth/interfaces";
import { ReduxAction, Thunk } from "../redux/interfaces";
import { ChangeApiHost, ChangeApiPort } from "./interfaces";

export function changeApiHost(host: string): ReduxAction<ChangeApiHost> {
  return { type: "CHANGE_API_HOST", payload: { host } };
};

export function changeApiPort(port: string): ReduxAction<ChangeApiPort> {
  return { type: "CHANGE_API_PORT", payload: { port } };
};

/** Lets Redux know that the app is ready to bootstrap. */
export function ready(): Thunk {
  return (dispatch, getState) => {
    let state: AuthState;
    // Old state is sometimes stored in localStorage for hot reloading pruposes.
    let token: string | undefined = localStorage["token"];
    if (token) {
      // Grab cached state from localStorage if it exists.
      state = JSON.parse(token);
    } else {
      state = getState().auth || {};
    }
    // HACK: If state.token is longer than 30 characters, we know it is there
    // and not a stub. This is a leftover from when Typescript had not-so-great
    // support for nullable types. TODO: Make state.auth.token a nullable type.
    if ((state.token || "").length > 30) { // lol
      didLogin(state, dispatch);
      return { type: "READY_HAD_TOKEN", payload: {} };
    } else {
      return { type: "READY_NO_TOKEN", payload: {} };
    };
  };
}
