import * as React from "react";
import { CalibrationRow } from "./calibration_button";
import { t } from "i18next";
import { BotConfigInputBox } from "./step_per_mm_box";
import { settingToggle, MCUFactoryReset } from "../actions";
import { ToggleButton } from "../../controls/toggle_button";
import { Widget, WidgetHeader, WidgetBody } from "../../ui/index";
import { HardwareSettingsProps, HardwareSettingsState } from "../interfaces";
import { HomingRow } from "./homing_row";
import { MustBeOnline } from "../must_be_online";
import { ZeroRow } from "./zero_row";
import { SaveBtn } from "../../ui/save_button";
import { NumericMCUInputGroup } from "./numeric_mcu_input_group";
import { BooleanMCUInputGroup } from "./boolean_mcu_input_group";
import { ToolTips } from "../../constants";

export class HardwareSettings
  extends React.Component<HardwareSettingsProps, HardwareSettingsState> {
  constructor() {
    super();
    this.state = { showAdvancedSettings: false };
  }

  toggleAdvancedSettings = () => {
    this.setState({ showAdvancedSettings: !this.state.showAdvancedSettings });
  }

  render() {
    let { bot, dispatch } = this.props;
    let { mcu_params } = bot.hardware;
    let { showAdvancedSettings } = this.state;
    let iconString = showAdvancedSettings ? "minus" : "plus";

    return <Widget className="hardware-widget">
      <WidgetHeader title="Hardware" helpText={ToolTips.HW_SETTINGS}>
        <MustBeOnline fallback=" "
          status={bot.hardware.informational_settings.sync_status}
          lockOpen={process.env.NODE_ENV !== "production"}>
          <SaveBtn
            isDirty={false}
            isSaving={bot.isUpdating}
            isSaved={!bot.isUpdating}
            dirtyText={" "}
            savingText={"Updating..."}
            savedText={"saved"}
            hidden={false} />
        </MustBeOnline>
      </WidgetHeader>
      <WidgetBody>
        <MustBeOnline fallback="Device is offline."
          status={bot.hardware.informational_settings.sync_status}
          lockOpen={process.env.NODE_ENV !== "production"}>
          <table className="plain">
            <thead>
              <tr>
                <th width="38%" />
                <th width="20%">
                  <label>{t("X AXIS")}</label>
                </th>
                <th width="20%">
                  <label>{t("Y AXIS")}</label>
                </th>
                <th width="20%">
                  <label>{t("Z AXIS")}</label>
                </th>
              </tr>
            </thead>
            <tbody>
              <NumericMCUInputGroup name={t("MAX SPEED (steps/s)")}
                tooltip={t(`Maximum travel speed after acceleration
                        in motor steps per second.`)}
                x={"movement_max_spd_x"}
                y={"movement_max_spd_y"}
                z={"movement_max_spd_z"}
                bot={this.props.bot}
                dispatch={this.props.dispatch} />
              <ZeroRow />
              <tr>
                <td>
                  <label>
                    [&nbsp;
                      <i onClick={this.toggleAdvancedSettings}
                      className={`fa fa-${iconString}`} />
                    &nbsp;]&nbsp;
                      {t("Advanced")}
                  </label>
                </td>
              </tr>
              <tr hidden={!showAdvancedSettings}>
                <td>
                  <label>{t("Steps per MM")}</label>
                  <div className="help">
                    <i className="fa fa-question-circle help-icon" />
                    <div className="help-text">
                      {t(`The number of motor steps required to move the axis
                        one millimeter.`)}
                    </div>
                  </div>
                </td>
                <BotConfigInputBox setting="steps_per_mm_x"
                  bot={bot}
                  dispatch={dispatch} />
                <BotConfigInputBox setting="steps_per_mm_y"
                  bot={bot}
                  dispatch={dispatch} />
                <BotConfigInputBox setting="steps_per_mm_z"
                  bot={bot}
                  dispatch={dispatch} />
              </tr>
              <NumericMCUInputGroup hidden={!showAdvancedSettings}
                name={t("Minimum Speed (steps/s)")}
                tooltip={t(`Minimum movement speed.
                Also used for homing, calibration,
                and movements across home.`)}
                x={"movement_min_spd_x"}
                y={"movement_min_spd_y"}
                z={"movement_min_spd_z"}
                bot={bot}
                dispatch={dispatch} />
              <NumericMCUInputGroup hidden={!showAdvancedSettings}
                name={t("ACCELERATE FOR (steps)")}
                tooltip={t(`Number of steps used for acceleration
                        and deceleration.`)}
                x={"movement_steps_acc_dec_x"}
                y={"movement_steps_acc_dec_y"}
                z={"movement_steps_acc_dec_z"}
                bot={bot}
                dispatch={dispatch} />
              <NumericMCUInputGroup hidden={!showAdvancedSettings}
                name={t("TIMEOUT AFTER (seconds)")}
                tooltip={t(`Amount of time to wait for a command to
                        execute before stopping.`)}
                x={"movement_timeout_x"}
                y={"movement_timeout_y"}
                z={"movement_timeout_z"}
                bot={bot}
                dispatch={dispatch} />
              <NumericMCUInputGroup hidden={!showAdvancedSettings}
                name={t("LENGTH (mm)")}
                tooltip={t(`Coming Soon! Set the length of each axis to provide
                        software limits.`)}
                x={"movement_axis_nr_steps_x"}
                y={"movement_axis_nr_steps_y"}
                z={"movement_axis_nr_steps_z"}
                bot={bot}
                dispatch={dispatch} />
              <NumericMCUInputGroup hidden={!showAdvancedSettings}
                name={t("ENCODER SCALING")}
                tooltip={t(`(Alpha) encoder scaling factor =
                        100 * (motor resolution * microsteps)
                        / (encoder resolution * 4)`)}
                x={"encoder_scaling_x"}
                y={"encoder_scaling_y"}
                z={"encoder_scaling_z"}
                bot={bot}
                dispatch={dispatch} />
              <NumericMCUInputGroup hidden={!showAdvancedSettings}
                name={t("Max missed steps")}
                tooltip={t(`(Alpha) Number of steps missed (determined by
                        encoder) before motor is considered to have stalled.`)}
                x={"encoder_missed_steps_max_x"}
                y={"encoder_missed_steps_max_y"}
                z={"encoder_missed_steps_max_z"}
                bot={bot}
                dispatch={dispatch} />
              <NumericMCUInputGroup hidden={!showAdvancedSettings}
                name={t("Encoder missed step decay")}
                tooltip={t(`(Alpha) Reduction to missed step total for every
                            good step.`)}
                x={"encoder_missed_steps_decay_x"}
                y={"encoder_missed_steps_decay_y"}
                z={"encoder_missed_steps_decay_z"}
                bot={bot}
                dispatch={dispatch} />
              <CalibrationRow hidden={!showAdvancedSettings}
                hardware={mcu_params} />
              <HomingRow hidden={!showAdvancedSettings}
                hardware={mcu_params} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("ENABLE ENCODERS")}
                tooltip={t(`(Alpha) Enable use of rotary encoders during
                        calibration and homing.`)}
                x={"encoder_enabled_x"}
                y={"encoder_enabled_y"}
                z={"encoder_enabled_z"}
                dispatch={dispatch}
                bot={bot} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("ALWAYS POWER MOTORS")}
                tooltip={t(`Keep power applied to motors. Prevents
                slipping from gravity in certain situations.`)}
                x={"movement_keep_active_x"}
                y={"movement_keep_active_y"}
                z={"movement_keep_active_z"}
                dispatch={dispatch}
                bot={bot} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("INVERT ENCODERS")}
                tooltip={t(`(Alpha) Reverse the direction of encoder position
                        reading.`)}
                x={"encoder_invert_x"}
                y={"encoder_invert_y"}
                z={"encoder_invert_z"}
                dispatch={dispatch}
                bot={bot} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("INVERT ENDPOINTS")}
                tooltip={t(`Swap axis end-stops during calibration.`)}
                x={"movement_invert_endpoints_x"}
                y={"movement_invert_endpoints_y"}
                z={"movement_invert_endpoints_z"}
                dispatch={dispatch}
                bot={bot} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("INVERT MOTORS")}
                tooltip={t(`Invert direction of motor during calibration.`)}
                x={"movement_invert_motor_x"}
                y={"movement_invert_motor_y"}
                z={"movement_invert_motor_z"}
                dispatch={dispatch}
                bot={bot} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("NEGATIVE COORDINATES ONLY")}
                tooltip={t(`Restrict travel to negative coordinate locations.
                        Overridden by disabling software limits.`)}
                x={"movement_home_up_x"}
                y={"movement_home_up_y"}
                z={"movement_home_up_z"}
                dispatch={dispatch}
                bot={bot} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("ENABLE ENDSTOPS")}
                tooltip={t(`Enable use of electronic end-stops during
                        calibration and homing.`)}
                x={"movement_enable_endpoints_x"}
                y={"movement_enable_endpoints_y"}
                z={"movement_enable_endpoints_z"}
                dispatch={dispatch}
                bot={bot} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("Find Home on Boot")}
                tooltip={t(`Finds the home position when the device
                powers on.`)}
                x={"movement_home_at_boot_x"}
                y={"movement_home_at_boot_y"}
                z={"movement_home_at_boot_z"}
                dispatch={dispatch}
                bot={bot} />
              <BooleanMCUInputGroup hidden={!showAdvancedSettings}
                name={t("Software limits")}
                tooltip={t(`Stop at home.`)}
                x={"movement_stop_at_home_x"}
                y={"movement_stop_at_home_y"}
                z={"movement_stop_at_home_z"}
                dispatch={dispatch}
                bot={bot} />
              <tr hidden={!showAdvancedSettings}>
                <td colSpan={100}>
                  <small>
                    {t("Second X Motor")}
                  </small>
                </td>
              </tr>
              <tr hidden={!showAdvancedSettings}>
                <td>
                  <label>{t("ENABLE MOTOR")}</label>
                  <div className="help">
                    <i className="fa fa-question-circle help-icon" />
                    <div className="help-text">
                      {t(`Enable use of a second x-axis motor.
                        Connects to E0 on RAMPS.`)}
                    </div>
                  </div>
                </td>
                <td>
                  <ToggleButton
                    toggleval={mcu_params.movement_secondary_motor_x}
                    toggleAction={() => settingToggle("movement_secondary_motor_x", bot)} />
                </td>
              </tr>
              <tr hidden={!showAdvancedSettings}>
                <td>
                  <label>{t("INVERT MOTOR")}</label>
                  <div className="help">
                    <i className="fa fa-question-circle help-icon" />
                    <div className="help-text">
                      {t(`Change the direction of the motor during calibration.`)}
                    </div>
                  </div>
                </td>
                <td>
                  <ToggleButton
                    toggleval={mcu_params.movement_secondary_motor_invert_x}
                    toggleAction={() => settingToggle("movement_secondary_motor_invert_x",
                      bot)} />
                </td>
              </tr>
              <tr hidden={!showAdvancedSettings}>
                <td>
                  <label>{t("RESET HARDWARE PARAMETER DEFAULTS")}</label>
                </td>
                <td colSpan={2}>
                  <p>
                    {t(`Restoring hardware parameter defaults will destroy the
                        current settings, resetting them to default values.`)}
                    &nbsp;
                  <b>{t("Will reboot device.")}</b>
                  </p>
                </td>
                <td>
                  <button className="red" onClick={() => MCUFactoryReset()}>
                    {t("RESET")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </MustBeOnline>
      </WidgetBody>
    </Widget >;
  }
}
