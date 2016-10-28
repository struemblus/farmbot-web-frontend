import { connectDevice, fetchFWUpdateInfo, fetchOSUpdateInfo } from "../devices/actions";
import { DeviceAccountSettings } from "../devices/interfaces";
import { push } from "../history";
import { fetchSequences } from "../sequences/actions";
import { fetchRegimens } from "../regimens/actions";
import { error } from "../logger";
import { AuthState, AuthToken } from "./interfaces";
import { fetchPlants } from "../farm_designer/actions";
import { ReduxAction, Thunk } from "../interfaces";
import * as Axios from "axios";
import { t } from "i18next";


/** This is what a response from /api/tokens looks like. */
export interface AuthResponse {
  token: AuthResponseToken;
};
/** The "token" property of an auth response from the API. */
export interface AuthResponseToken {
  unencoded: AuthToken;
  encoded: string;
};

export function didLogin(authState: AuthState, dispatch: Function) {
  dispatch(fetchOSUpdateInfo(authState.os_update_server));
  dispatch(fetchFWUpdateInfo(authState.fw_update_server));
  dispatch(loginOk(authState));
  dispatch(downloadDeviceData(authState.iss));
  dispatch(fetchSequences());
  dispatch(fetchRegimens(authState.iss));
  dispatch(fetchPlants(authState.iss));
  dispatch(connectDevice(authState.token));
};

export function downloadDeviceData(baseUrl: string): Thunk {
  return function (dispatch, getState) {
    Axios.get<DeviceAccountSettings>(baseUrl + "/api/device")
      .then(res => dispatch({ type: "REPLACE_DEVICE_ACCOUNT_INFO", payload: res.data }))
      .catch(payload => dispatch({ type: "DEVICE_ACCOUNT_ERR", payload }));
  };
};

// We need to handle OK logins for numerous use cases (Ex: login AND registration)
export function onLogin(dispatch: Function) {
  return (response: Axios.AxiosXHR<AuthResponse>) => {
    let { data } = response;
    let tokenData: AuthResponseToken = _.cloneDeep<any>(data.token);
    let authState: AuthState = {
      token: tokenData.encoded,
      sub: tokenData.unencoded.sub,
      jti: tokenData.unencoded.jti,
      iss: tokenData.unencoded.iss,
      mqtt: tokenData.unencoded.mqtt,
      bot: tokenData.unencoded.bot,
      iat: tokenData.unencoded.iat,
      exp: tokenData.unencoded.exp,
      os_update_server: tokenData.unencoded.os_update_server,
      fw_update_server: tokenData.unencoded.fw_update_server,
      authenticated: true
    };
    didLogin(authState, dispatch);
    push("/app/dashboard/controls");
  };
};

export function login(username: string,
  password: string,
  url: string): Thunk {
  return dispatch => {
    return requestToken(username, password, url).then(
      onLogin(dispatch),
      (err) => dispatch(loginErr(err))
    );
  };
}

function loginErr(err: AuthResponse) {
  error(t("Login failed."));
  return {
    type: "LOGIN_ERR",
    payload: err
  };
}

/** Very important. Once called, all outbound HTTP requests will
 * have a JSON Web Token attached to their "Authorization" header,
 * thereby granting access to the API. */
export function loginOk(auth: AuthState): ReduxAction<AuthState> {
  // TODO: Create a shareable axios instance and set the `baseURL`
  // IDEA: https://medium.com/@srph/axios-configure-the-base-path-daed6ff79eab#.145enq9g6
  // OR THIS: https://github.com/srph/axios-base-url
  // property so we can get rid of all that un-DRY URL concat junk.
  // This is how we attach the auth token to every
  // outbound HTTP request (after user logs in).
  Axios.interceptors.request.use(function (config) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = auth.token;
    return config;
  });
  return {
    type: "LOGIN_OK",
    payload: auth
  };
}

/** Sign up for the FarmBot service over AJAX. */
export function register(name: string,
  email: string,
  password: string,
  confirmation: string,
  url: string): Thunk {
  return dispatch => {
    let p = requestRegistration(name,
      email,
      password,
      confirmation,
      url);
    return p.then(onLogin(dispatch),
      onRegistrationErr(dispatch));
  };
}

/** Handle user registration errors. */
export function onRegistrationErr(dispatch: Function) {
  return (err: any) => {
    let msg = _.values(err.data)
      .join(". ")
      .replace(/nil/g, "empty") || "Unknown server error.";
    error(msg);
    dispatch({
      type: "REGISTRATION_ERROR",
      payload: err
    });
  };
}

/** Build a JSON object in preparation for an HTTP POST
 *  to registration endpoint */
function requestRegistration(name: string,
  email: string,
  password: string,
  confirmation: string,
  url: string) {
  let form = {
    user: {
      email: email,
      password: password,
      password_confirmation: confirmation,
      name: name
    }
  };
  return Axios.post<AuthResponse>(url + "/api/users", form);
}

/** Get a token from /api/token if you're already a registered user. */
function requestToken(email: string,
  password: string,
  url: string) {
  let payload = { user: { email: email, password: password } };
  let path = url + "/api/tokens";
  return Axios.post<AuthResponse>(path, payload);
}

export function logout() {
  localStorage.clear();
  sessionStorage.clear();

  return {
    type: "LOGOUT",
    payload: {}
  };
}
