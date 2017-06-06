import * as React from "react";
import { t } from "i18next";
import { CalibrationRow } from "./calibration_button";
import { BotConfigInputBox } from "./step_per_mm_box";
import { settingToggle, MCUFactoryReset, toggleControlPanel } from "../actions";
import { ToggleButton } from "../../controls/toggle_button";
import { Widget, WidgetHeader, WidgetBody } from "../../ui/index";
import { HardwareSettingsProps } from "../interfaces";
import { HomingRow } from "./homing_row";
import { MustBeOnline } from "../must_be_online";
import { ZeroRow } from "./zero_row";
import { SaveBtn } from "../../ui/save_button";
import { NumericMCUInputGroup } from "./numeric_mcu_input_group";
import { BooleanMCUInputGroup } from "./boolean_mcu_input_group";
import { ToolTips } from "../../constants";
import { enabledAxisMap } from "./axis_tracking_status";

const MSMX = "movement_secondary_motor_x";
const MSMInvert = "movement_secondary_motor_invert_x";

export class HardwareSettings
  extends React.Component<HardwareSettingsProps, {}> {

  render() {
    let { bot, dispatch } = this.props;
    let { mcu_params } = bot.hardware;
    let hidePanel = this.props.controlPanelClosed;
    let iconString = hidePanel ? "plus" : "minus";

    /** Tells us if X/Y/Z have a means of checking their position.
     * FARMBOT WILL CRASH INTO WALLS IF THIS IS WRONG! BE CAREFUL */
    let enabled = enabledAxisMap(mcu_params)

    return <Widget className="hardware-widget">
      <WidgetHeader title="Hardware" helpText={ToolTips.HW_SETTINGS}>
        <MustBeOnline
          status={bot.hardware.informational_settings.sync_status}
          lockOpen={process.env.NODE_ENV !== "production"}>
          <SaveBtn
            isDirty={false}
            isSaving={bot.isUpdating}
            isSaved={!bot.isUpdating}
            dirtyText={" "}
            savingText={"Updating..."}
            savedText={"saved"}
            hidden={false}
          />
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
              <NumericMCUInputGroup
                name={t("Max Speed (steps/s)")}
                tooltip={t(ToolTips.MAX_SPEED)}
                x={"movement_max_spd_x"}
                y={"movement_max_spd_y"}
                z={"movement_max_spd_z"}
                bot={bot}
                dispatch={dispatch}
              />
              <ZeroRow />
              <tr>
                <td>
                  <label onClick={() => dispatch(toggleControlPanel())}>
                    [&nbsp;
                      <i className={`fa fa-${iconString}`} />
                    &nbsp;]&nbsp;
                      {t("Advanced")}
                  </label>
                </td>
              </tr>
              <tr hidden={hidePanel}>
                <td>
                  <label>{t("Steps per MM")}</label>
                  <div className="help">
                    <i className="fa fa-question-circle help-icon" />
                    <div className="help-text">
                      {t(ToolTips.STEPS_PER_MM)}
                    </div>
                  </div>
                </td>
                <BotConfigInputBox setting="steps_per_mm_x"
                  bot={bot}
                  dispatch={dispatch}
                />
                <BotConfigInputBox setting="steps_per_mm_y"
                  bot={bot}
                  dispatch={dispatch}
                />
                <BotConfigInputBox setting="steps_per_mm_z"
                  bot={bot}
                  dispatch={dispatch}
                />
              </tr>
              <NumericMCUInputGroup
                hidden={hidePanel}
                name={t("Minimum Speed (steps/s)")}
                tooltip={t(`Minimum movement speed. Also used for homing,
                calibration, and movements across home.`)}
                x={"movement_min_spd_x"}
                y={"movement_min_spd_y"}
                z={"movement_min_spd_z"}
                bot={bot}
                dispatch={dispatch}
              />
              <NumericMCUInputGroup
                hidden={hidePanel}
                name={t("Accelerate for (steps)")}
                tooltip={t(ToolTips.ACCELERATE_FOR)}
                x={"movement_steps_acc_dec_x"}
                y={"movement_steps_acc_dec_y"}
                z={"movement_steps_acc_dec_z"}
                bot={bot}
                dispatch={dispatch}
              />
              <NumericMCUInputGroup hidden={hidePanel}
                name={t("Timeout after (seconds)")}
                tooltip={t(ToolTips.TIMEOUT_AFTER)}
                x={"movement_timeout_x"}
                y={"movement_timeout_y"}
                z={"movement_timeout_z"}
                bot={bot}
                dispatch={dispatch}
              />
              <NumericMCUInputGroup
                hidden={hidePanel}
                name={t("Axis Length (steps)")}
                tooltip={t(ToolTips.LENGTH)}
                x={"movement_axis_nr_steps_x"}
                y={"movement_axis_nr_steps_y"}
                z={"movement_axis_nr_steps_z"}
                bot={bot}
                dispatch={dispatch}
              />
              <NumericMCUInputGroup
                hidden={hidePanel}
                name={t("Encoder Scaling")}
                tooltip={t(ToolTips.ENCODER_SCALING)}
                x={"encoder_scaling_x"}
                y={"encoder_scaling_y"}
                z={"encoder_scaling_z"}
                bot={bot}
                dispatch={dispatch}
              />
              <NumericMCUInputGroup
                hidden={hidePanel}
                name={t("Max Missed Steps")}
                tooltip={t(ToolTips.MAX_MISSED_STEPS)}
                x={"encoder_missed_steps_max_x"}
                y={"encoder_missed_steps_max_y"}
                z={"encoder_missed_steps_max_z"}
                bot={bot}
                dispatch={dispatch}
              />
              <NumericMCUInputGroup
                hidden={hidePanel}
                name={t("Encoder Missed Step Decay")}
                tooltip={t(ToolTips.ENCODER_MISSED_STEP_DECAY)}
                x={"encoder_missed_steps_decay_x"}
                y={"encoder_missed_steps_decay_y"}
                z={"encoder_missed_steps_decay_z"}
                bot={bot}
                dispatch={dispatch}
              />
              <CalibrationRow
                hidden={hidePanel}
                hardware={mcu_params}
              />
              <HomingRow
                hidden={hidePanel}
                hardware={mcu_params}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Enable Encoders")}
                tooltip={t(ToolTips.ENABLE_ENCODERS)}
                x={"encoder_enabled_x"}
                y={"encoder_enabled_y"}
                z={"encoder_enabled_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Always Power Motors")}
                tooltip={t(ToolTips.ALWAYS_POWER_MOTORS)}
                x={"movement_keep_active_x"}
                y={"movement_keep_active_y"}
                z={"movement_keep_active_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Invert Encoders")}
                tooltip={t(ToolTips.INVERT_ENCODERS)}
                x={"encoder_invert_x"}
                y={"encoder_invert_y"}
                z={"encoder_invert_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Invert Endpoints")}
                tooltip={t(ToolTips.INVERT_ENDPOINTS)}
                x={"movement_invert_endpoints_x"}
                y={"movement_invert_endpoints_y"}
                z={"movement_invert_endpoints_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Invert Motors")}
                tooltip={t(ToolTips.INVERT_MOTORS)}
                x={"movement_invert_motor_x"}
                y={"movement_invert_motor_y"}
                z={"movement_invert_motor_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Negative Coordinates Only")}
                tooltip={t(ToolTips.NEGATIVE_COORDINATES_ONLY)}
                x={"movement_home_up_x"}
                y={"movement_home_up_y"}
                z={"movement_home_up_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Enable Endstops")}
                tooltip={t(ToolTips.ENABLE_ENDSTOPS)}
                x={"movement_enable_endpoints_x"}
                y={"movement_enable_endpoints_y"}
                z={"movement_enable_endpoints_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Find Home on Boot")}
                tooltip={t(ToolTips.FIND_HOME_ON_BOOT)}
                disableX={!enabled.x}
                disableY={!enabled.y}
                disableZ={!enabled.z}
                x={"movement_home_at_boot_x"}
                y={"movement_home_at_boot_y"}
                z={"movement_home_at_boot_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Software Limits")}
                tooltip={t(ToolTips.SOFTWARE_LIMITS)}
                x={"movement_stop_at_home_x"}
                y={"movement_stop_at_home_y"}
                z={"movement_stop_at_home_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Stop at Max")}
                tooltip={t(ToolTips.STOP_AT_MAX)}
                x={"movement_stop_at_max_x"}
                y={"movement_stop_at_max_y"}
                z={"movement_stop_at_max_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <BooleanMCUInputGroup
                hidden={hidePanel}
                name={t("Use Encoders for Positioning")}
                tooltip={t(ToolTips.ENCODER_POSITIONING)}
                x={"encoder_use_for_pos_x"}
                y={"encoder_use_for_pos_y"}
                z={"encoder_use_for_pos_z"}
                dispatch={dispatch}
                bot={bot}
              />
              <tr hidden={hidePanel}>
                <td colSpan={100}>
                  <small>
                    {t("Second X Motor")}
                  </small>
                </td>
              </tr>
              <tr hidden={hidePanel}>
                <td>
                  <label>{t("Enable Motor")}</label>
                  <div className="help">
                    <i className="fa fa-question-circle help-icon" />
                    <div className="help-text">
                      {t(ToolTips.ENABLE_MOTOR)}
                    </div>
                  </div>
                </td>
                <td>
                  <ToggleButton
                    toggleval={mcu_params.movement_secondary_motor_x}
                    toggleAction={() => settingToggle(MSMX, bot)}
                  />
                </td>
              </tr>
              <tr hidden={hidePanel}>
                <td>
                  <label>{t("Invert Motor")}</label>
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
                    toggleAction={() => settingToggle(MSMInvert, bot)}
                  />
                </td>
              </tr>
              <tr hidden={hidePanel}>
                <td>
                  <label>{t("Reset hardware parameter defaults")}</label>
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
    </Widget>;
  }
}
