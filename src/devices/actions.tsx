import { Farmbot } from "farmbot";
import { devices } from "../device";
import { error, success } from "../logger";
import { Thunk, Everything, ReduxAction } from "../interfaces";
import { put, get } from "axios";
import {
  DeviceAccountSettingsUpdate,
  DeviceAccountSettings,
  BotState
} from "../devices/interfaces";
import { t } from "i18next";
import { configKey } from "farmbot/dist/interfaces";
import { MovementRequest } from "farmbot/dist/bot_commands";
import { Notification } from "farmbot/dist/jsonrpc";
import { Sequence } from "../sequences/interfaces";
import { handleIncomingBotNotification } from "./incoming_bot_notification";
import { Regimen } from "../regimens/interfaces";

const ON = 1,
  OFF = 0,
  DIGITAL = 0;

export function startRegimen(regimen: Regimen) {
  let noun = "Start Regimen";
  if (regimen.id != undefined) {
    devices
      .current
      .startRegimen(regimen.id)
      .then(() => { commandOK(noun); })
      .catch(() => { commandErr(noun); });
  }
}

export function stopRegimen(regimen: Regimen) {
  let noun = "Stop Regimen";
  if (regimen.id != undefined) {
    devices
      .current
      .stopRegimen(regimen.id)
      .then(() => { commandOK(noun); })
      .catch(() => { commandErr(noun); });
  }
}

export function toggleOSAutoUpdate() {
  let noun = "OS Update Toggle";
  devices
    .current
    .toggleOSAutoUpdate()
    .then(() => { commandOK(noun); })
    .catch(() => { commandErr(noun); });
}

export function toggleFWAutoUpdate() {
  let noun = "FW Update Toggle";
  devices
    .current
    .toggleFWAutoUpdate()
    .then(() => { commandOK(noun); })
    .catch(() => { commandErr(noun); });
}

export function checkControllerUpdates() {
  let noun = "Check for Updates";
  devices
    .current
    .checkUpdates()
    .then(commandOK(noun), commandErr(noun));
}

export function powerOff() {
  let noun = "Power Off Bot";
  devices
    .current
    .powerOff()
    .then(commandOK(noun), commandErr(noun));
}

export function reboot() {
  let noun = "Reboot Bot";
  devices
    .current
    .reboot()
    .then(commandOK(noun), commandErr(noun));
}

export function checkArduinoUpdates() {
  let noun = "Check Firmware Updates";
  devices
    .current
    .checkArduinoUpdates()
    .then(commandOK(noun), commandErr(noun));
}

export function emergencyStop() {
  let noun = "Emergency stop";
  devices
    .current
    .emergencyStop()
    .then(commandOK(noun), commandErr(noun));
}

export function sync(): Thunk {
  let noun = "Sync";
  return function (dispatch, getState) {
    devices
      .current
      .sync()
      .then(() => {
        commandOK(noun);
        dispatch({ type: "BOT_SYNC_OK", payload: {} });
      }).catch(() => {
        commandErr(noun);
      });
  };
}

export function execSequence(sequence: Sequence) {
  const noun = "Sequence execution";
  console.warn("Fix this / remove any type here!");
  return devices
    .current
    .execSequence(sequence as any)
    .then(commandOK(noun), commandErr(noun));
}

export let saveAccountChanges: Thunk = function (dispatch, getState) {
  let state = getState();
  let bot = getState().bot.account;
  let url = state.auth.iss;
  return updateDevice(url, bot, dispatch);
};

let commandErr = (noun = "Command") => () => {
  let msg = noun + " request failed.";
  error(msg, t("Farmbot Didn't Get That!"));
};

let commandOK = (noun = "Command") => () => {
  let msg = noun + " request sent to device.";
  success(msg, t("Request sent"));
};

interface UpdateDeviceParams {
  id?: number;
  name?: string;
  uuid?: string;
  webcam_url?: string;
}

interface GithubRelease {
  tag_name: string;
}

export function fetchOSUpdateInfo(url: string): Thunk {
  return (dispatch: Function, getState: Function) => {
    get<GithubRelease>(url)
      .then((resp) => {
        let version = resp.data.tag_name;
        let versionWithoutV = version.slice(1, version.length);
        dispatch({ type: "FETCH_OS_UPDATE_INFO_OK", payload: versionWithoutV });
      })
      .catch((ferror) => {
        error(t("Couldn't get os update info"), JSON.stringify(ferror));
        dispatch({ type: "FETCH_OS_UPDATE_INFO_ERROR", payload: ferror });
      });
  };
}

export function fetchFWUpdateInfo(url: string) {
  return (dispatch: Function, getState: Function) => {
    get<GithubRelease>(url)
      .then((resp) => {
        let version = resp.data.tag_name;
        let versionWithoutV = version.slice(1, version.length);
        dispatch({ type: "FETCH_FW_UPDATE_INFO_OK", payload: versionWithoutV });
      })
      .catch((ferror) => {
        error(t("Couldn't get fw update info"), JSON.stringify(ferror));
        dispatch({ type: "FETCH_FW_UPDATE_INFO_ERROR", payload: ferror });
      });
  };
}

export function updateDevice(apiUrl: string,
  optns: DeviceAccountSettingsUpdate, dispatch: Function) {
  return put<DeviceAccountSettingsUpdate>(apiUrl + "/api/device", optns)
    .then(res => dispatch({ type: "REPLACE_DEVICE_ACCOUNT_INFO", payload: res.data }))
    .catch((payload) => dispatch({ type: "DEVICE_ACCOUNT_ERR", payload }));
  ;
}

export function changeDevice(newAttrs: any) {
  // Flips the "dirty" flag to true.
  return {
    type: "CHANGE_DEVICE",
    payload: newAttrs
  };
}

export function addDevice(deviceAttrs: DeviceAccountSettings): Thunk {
  return (dispatch, getState) => {
    updateDevice(getState().auth.iss, deviceAttrs, dispatch);
  };
}

export function settingToggle(name: configKey, bot: BotState) {
  // TODO : This should be an atomic operation handled at the bot level
  // as a lower level command.
  const noun = "Setting toggle";
  return devices
    .current
    .updateCalibration({
      [name]: ((bot.hardware as any)[name] === 0) ? ON : OFF
    })
    .then(commandOK(noun), commandErr(noun));
};

export function moveRelative(props: MovementRequest) {
  const noun = "Relative movement";
  return devices
    .current
    .moveRelative(props)
    .then(commandOK(noun), commandErr(noun));
}

export function pinToggle(pin_number: number) {
  const noun = "Setting toggle";
  return devices
    .current
    .togglePin({ pin_number })
    .then(commandOK(noun), commandErr(noun));
}

export function homeAll(speed: number) {
  let noun = "'Home All' command";
  devices
    .current
    .homeAll({ speed })
    .then(commandOK(noun), commandErr(noun));
}

export function readStatus() {
  let noun = "'Read Status' command";
  return devices
    .current
    .readStatus()
    .then(() => {
      commandOK(noun);
    })
    .catch(commandErr(noun));
}

export function connectDevice(token: string): {} | ((dispatch: any) => any) {
  return (dispatch) => {
    let bot = new Farmbot({ token });
    return bot
      .connect()
      .then(() => {
        devices.current = bot;
        readStatus();
        dispatch(sync());
        bot.on("notification",
          (msg: Notification<any>) => { handleIncomingBotNotification(msg, dispatch); });
      }, (err) => dispatch(fetchDeviceErr(err)));
  };
};

function fetchDeviceErr(err: Error) {
  return {
    type: "FETCH_DEVICE_ERR",
    payload: err
  };
}

export interface ChangeSettingsBuffer {
  key: configKey;
  val: number;
};

export function changeSettingsBuffer(key: configKey, val: string):
  ReduxAction<ChangeSettingsBuffer> {

  return {
    type: "CHANGE_SETTINGS_BUFFER",
    payload: { key, val: parseInt(val, 10) }
  };
}

export function changeStepSize(integer: number) {
  return {
    type: "CHANGE_STEP_SIZE",
    payload: integer
  };
}

export function commitAxisChanges() {
  return function (
    dispatch: Function,
    getState: () => Everything) {
    let {axisBuffer, hardware} = getState().bot;
    let speed: number = devices.current.getState()["speed"] as number;
    /** Pick the value in axisBuffer or hardware settings dictionary.
     *  axisBuffer has higher priortiy, but may not be available. */
    function pick(attr: string,
      fallback?: number) {
      return Number(axisBuffer[attr] || (hardware as any)[attr] || fallback);
    };
    let packet: MovementRequest = {
      speed: pick("speed", speed),
      x: pick("x", 0),
      y: pick("y", 0),
      z: pick("z", 0),
    };
    let noun = "Move Absolute Command";
    return devices
      .current
      .moveAbsolute(packet)
      .then(commandOK(noun), commandErr(noun));
  };
}

export function commitSettingsChanges() {
  return function (dispatch: Function,
    getState: () => Everything): Thenable<void> {
    let { settingsBuffer, hardware } = getState().bot;
    let packet = _({})
      .assign(hardware)
      .assign(settingsBuffer)
      .value();
    return devices
      .current
      .updateCalibration(packet)
      .then(
      (resp) => dispatch(commitSettingsChangesOk(resp)),
      (err) => dispatch(commitSettingsChangesErr(err)));
  };
}

function commitSettingsChangesOk(_: any) {
  return {
    type: "COMMIT_SETTINGS_OK",
    payload: {}
  };
}

function commitSettingsChangesErr(_: any) { error(t("Unable to commit settings changes.")); }

export function changeAxisBuffer(key: string, val: number) {
  return {
    type: "CHANGE_AXIS_BUFFER",
    payload: { key, val }
  };
}

export function clearLogs(): Thunk {
  return function (dispatch, getState) {
    dispatch({ type: "CLEAR_BOT_LOG", payload: {} });
  };
}
