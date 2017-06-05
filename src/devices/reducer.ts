import { BotState, HardwareState } from "./interfaces";
import { generateReducer } from "../redux/generate_reducer";

export function versionOK(stringyVersion = "0.0.0",
  EXPECTED_MAJOR = 3,
  EXPECTED_MINOR = 1) {
  let [actual_major, actual_minor] = stringyVersion
    .split(".")
    .map(x => parseInt(x, 10));
  if (actual_major > EXPECTED_MAJOR) {
    return true;
  } else {
    let majorOK = (actual_major == EXPECTED_MAJOR);
    let minorOK = (actual_minor >= EXPECTED_MINOR);
    return (majorOK && minorOK);
  }
}
let initialState: BotState = {
  stepSize: 100,
  controlPanelClosed: true,
  hardware: {
    mcu_params: {},
    location: [-1, -1, -1],
    pins: {},
    configuration: {},
    informational_settings: {},
    user_env: {},
    process_info: {
      farmwares: {},
    }
  },
  dirty: false,
  currentOSVersion: undefined,
  currentFWVersion: undefined,
};

export let botReducer = generateReducer<BotState>(initialState)
  .add<void>("TOGGLE_CONTROL_PANEL", function (s, a) {
    s.controlPanelClosed = !s.controlPanelClosed;
    return s;
  })
  .add<number>("CHANGE_STEP_SIZE", function (s, a) {
    return Object.assign({}, s, {
      stepSize: a.payload
    });
  })
  .add<void>("SETTING_UPDATE_START", (s, a) => {
    s.isUpdating = true;
    return s;
  })
  .add<void>("SETTING_UPDATE_END", (s, a) => {
    s.isUpdating = false;
    return s;
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
