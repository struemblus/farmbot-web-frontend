import { BotState } from "../interfaces";
import { McuParamName, McuParams } from "farmbot/dist";

export interface HomingRowProps {
  hidden?: boolean | undefined;
  hardware: McuParams;
}

export interface HomingAndCalibrationProps {
  hidePanel: boolean;
  dispatch: Function;
  bot: BotState;
}

export interface BooleanMCUInputGroupProps {
  bot: BotState;
  dispatch: Function;
  tooltip?: string | undefined;
  name: string;
  x: McuParamName;
  y: McuParamName;
  z: McuParamName;
  disableX?: boolean | undefined;
  disableY?: boolean | undefined;
  disableZ?: boolean | undefined;
  hidden?: boolean | undefined;
}

export interface CalibrationRowProps {
  hidden?: boolean | undefined;
  hardware: McuParams;
}

export interface NumericMCUInputGroupProps {
  bot: BotState;
  dispatch: Function;
  tooltip?: string | undefined;
  name: string;
  x: McuParamName;
  y: McuParamName;
  z: McuParamName;
  hidden?: boolean;
}

export interface MotorsProps {
  hidePanel: boolean;
  dispatch: Function;
  bot: BotState;
}
