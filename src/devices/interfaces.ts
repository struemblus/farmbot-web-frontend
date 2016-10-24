import { BotStateTree } from "farmbot/dist/interfaces";

export interface BotLog {
  /** The actual message that was emitted */
  message: string;
  /** a Unix timestamp (UTC) */
  time: number;
  /** A subset of interface `HardwareState`. But I only needed x,y,z. */
  status: HardwareState;
};

/** How the device is stored in the API side.
 * This is what comes back from the API as JSON.
 */
export interface DeviceAccountSettings {
  id: number;
  name: string;
  uuid: string;
  webcam_url?: string;
  /** Must the deivce be saved? */
  dirty?: boolean;
};

/**
 * Rpc Log message from the bot.
 */
export interface RpcBotLog {
  channels: string[];
  message: string;
  time: number;
  status: HardwareState;

}

/** Typescript does not have partial types yet.
 *  When it does, we can pull this out*/
export interface DeviceAccountSettingsUpdate {
  id?: number;
  name?: string;
  uuid?: string;
  webcam_url?: string;
  dirty?: boolean;
};

export interface BotState {
  account: DeviceAccountSettings;
  /** Maximum number of messages to cache. Excess is truncated. */
  logQueueSize: number;
  logQueue: BotLog[];
  status: string;
  /** How many steps to move when the user presses a manual movement arrow */
  stepSize: number;
  /** The current os version on the github release api */
  currentOSVersion?: string;
  /** The current fw version on the github release api */
  currentFWVersion?: string;
  /** Is the bot in sync with the api */
  dirty: boolean;
  /** Holds coordinates that the user is currently editing, but has not sent */
  axisBuffer: {
    // x?: string;
    // y?: string;
    // z?: string;
    [name: string]: string | undefined;
  };
  /** Holds settings that the user is currently editing, but has not sent */
  settingsBuffer: {
    movement_max_spd_x?: string;
    movement_max_spd_y?: string;
    movement_max_spd_z?: string;
    movement_steps_acc_dec_x?: string;
    movement_steps_acc_dec_y?: string;
    movement_steps_acc_dec_z?: string;
    movement_timeout_x?: string;
    movement_timeout_y?: string;
    movement_timeout_z?: string;
    [name: string]: string | undefined;
  };
  hardware: HardwareState;
}

/** Status registers for the bot's status */
export type HardwareState = BotStateTree;

export interface MqttMessage {
  error?: string | undefined;
  id?: string | undefined;
  result: HardwareState;
}

