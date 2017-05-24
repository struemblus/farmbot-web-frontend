import { BotState, Xyz } from "../devices/interfaces";
import { Vector3 } from "farmbot/dist";
import { AuthState } from "../auth/interfaces";
import { TaggedPeripheral, TaggedDevice } from "../resources/tagged_resources";
import { RestResources } from "../resources/interfaces";

export interface Props {
  dispatch: Function;
  bot: BotState;
  account: TaggedDevice;
  auth: AuthState | undefined;
  peripherals: TaggedPeripheral[];
  resources: RestResources;
}

export interface State {
  x_axis_inverted: boolean;
  y_axis_inverted: boolean;
  z_axis_inverted: boolean;
}

export interface WebcamPanelState {
  isEditingCameraURL: boolean;
  url: string;
}

export interface DirectionButtonProps {
  axis: Xyz;
  direction: "up" | "down" | "left" | "right";
  steps: number;
}

export type Vector = Vector3;

export interface AxisInputBoxGroupProps {
  onCommit: (v: Vector) => void;
  bot: BotState;
}

export interface AxisInputBoxGroupState {
  x?: number | undefined;
  y?: number | undefined;
  z?: number | undefined;
}

export interface AxisInputBoxProps {
  axis: Xyz;
  label: string;
  value: number | undefined;
  onChange: (key: string, val: number | undefined) => void;
}

export interface AxisInputBoxState {
  value: string | undefined;
}

export interface StepSizeSelectorProps {
  choices: number[];
  selected: number;
  selector: (num: number) => void;
}

export interface JogMovementControlsProps {
  bot: BotState;
}

export interface ToggleButtonProps {
  /** Function that is executed when the toggle button is clicked */
  toggleAction: () => void;
  toggleval: number | string | undefined;
}


