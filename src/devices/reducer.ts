import * as _ from "lodash";
import { BotState, HardwareState } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";
import * as i18next from "i18next";
import { ChangeSettingsBuffer } from "./interfaces";
import { Configuration } from "farmbot";
import { betterMerge } from "../util";

export function versionOK(stringyVersion = "0.0.0",
  EXPECTED_MAJOR = 3,
  EXPECTED_MINOR = 1) {
  let [actual_major, actual_minor] = stringyVersion
    .split(".")
    .map(x => parseInt(x, 10));
  if ((actual_major >= EXPECTED_MAJOR) &&
    (actual_minor >= EXPECTED_MINOR)) {
    return true;
  }
  return false;
}
let initialState: BotState = {
  stepSize: 100,
  hardware: {
    mcu_params: {},
    location: [-1, -1, -1],
    pins: {},
    configuration: {},
    informational_settings: {},
    user_env: {},
    process_info: {
      farmwares: [],
      regimens: [],
      farm_events: []
    }
  },
  settingsBuffer: {},
  configBuffer: {},
  dirty: false,
  currentOSVersion: undefined,
  currentFWVersion: undefined,
};

export let botReducer = generateReducer<BotState>(initialState)
  .add<{}>("COMMIT_SETTINGS_OK", function (s, a) {
    let nextState = Object.assign({}, s, {
      settingsBuffer: {}
    });
    return nextState;
  })
  .add<Partial<Configuration>>("CHANGE_CONFIG_BUFFER", function (s, a) {
    let old_buffer = s.configBuffer;
    let new_buffer = a.payload;
    let nextConfig = betterMerge(old_buffer, new_buffer);
    s.configBuffer = nextConfig;
    s.dirty = true;
    return s;
  })
  .add<ChangeSettingsBuffer>("CHANGE_SETTINGS_BUFFER",
  function (s, a) {
    let newVal = a.payload.val;
    if (newVal) {
      s.settingsBuffer[a.payload.key] = a.payload.val.toString();
    } else {
      delete s.settingsBuffer[a.payload.key];
    }
    return Object.assign({}, s, {
      settingsBuffer: s.settingsBuffer
    });
  })
  .add<number>("CHANGE_STEP_SIZE", function (s, a) {
    return Object.assign({}, s, {
      stepSize: a.payload
    });
  })
  .add<HardwareState>("BOT_CHANGE",
  function (s, a) {
    let nextState = a.payload;
    s.hardware = nextState;
    versionOK(nextState.informational_settings.controller_version);
    return s;
  })
  .add<string>("FETCH_OS_UPDATE_INFO_OK", function (s, a) {
    s.currentOSVersion = a.payload;
    return s;
  })
  .add<string>("FETCH_FW_UPDATE_INFO_OK", function (s, a) {
    s.currentFWVersion = a.payload;
    return s;
  });
