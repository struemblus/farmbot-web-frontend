import { error } from "../ui";
import * as _ from "lodash";
import { BotState, DeviceAccountSettings, HardwareState } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";
import { ReduxAction } from "../redux/interfaces";
import * as i18next from "i18next";
import { ChangeSettingsBuffer } from "./interfaces";
import { Configuration } from "farmbot";

let initialState: BotState = {
  account: { id: 0, name: "" },
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
  .add<HardwareState>("SETTING_TOGGLE_OK",
  function (s: BotState, action: ReduxAction<HardwareState>) {

    let hardware = action.payload;
    return Object.assign({},
      s, {
        hardware: hardware
      });
  })
  .add<{}>("COMMIT_SETTINGS_OK", function (s, a) {
    let nextState = Object.assign({}, s, {
      settingsBuffer: {}
    });
    return nextState;
  })
  .add<Configuration>("CHANGE_CONFIG_BUFFER", function (s, a) {
    let old_buffer = s.configBuffer;
    let new_buffer = a.payload;
    Object.assign(old_buffer, new_buffer);
    let new_state = Object.assign({}, s, { config_buffer: new_buffer });
    return new_state; // I am doing something wrong.
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
    s.hardware = a.payload;
    return s;
  })
  .add<DeviceAccountSettings>("CHANGE_DEVICE", function (s, a) {
    Object.assign(s.account, a.payload, { dirty: true });
    return s;
  })
  .add<any>("FETCH_DEVICE", function (s, a) {
    return s;
  })
  .add<any>("FETCH_DEVICE_OK", function (s, { payload }) {
    return Object.assign({},
      s,
      payload);
  })
  .add<any>("FETCH_DEVICE_ERR", function (s, a) {
    return Object.assign({}, s);
  })
  .add<any>("SAVE_DEVICE_ERR", function (s, a) {
    switch (a.payload.status) {
      case 422:
        let errors = _.map(a.payload.responseJSON, v => v)
          .join(". ");
        error(errors, i18next.t("Couldn\'t save device."));
        break;
      default:
        error(i18next.t("Error while saving device."));
        break;
    }
    return s;
  })
  .add<any>("SAVE_DEVICE_OK", function (s, a) {
    return Object.assign({}, s, a.payload, {
      dirty: false
    });
  })
  .add<DeviceAccountSettings>("REPLACE_DEVICE_ACCOUNT_INFO", function (s, a) {
    s.account = a.payload;
    return s;
  })
  .add<string>("CHANGE_WEBCAM_URL", function (s, a) {
    s.account.dirty = true;
    s.account.webcam_url = a.payload;
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
