import * as React from "react";
import { t } from "i18next";
import { BooleanMCUInputGroup } from "../boolean_mcu_input_group";
import { ToolTips } from "../../../constants";
import { BotState } from "../../interfaces";
import { SpacePanelToolTip } from "../space_panel_tool_tip";
import { ToggleButton } from "../../../controls/toggle_button";
import { settingToggle } from "../../actions";
import { NumericMCUInputGroup } from "../numeric_mcu_input_group";
import { BotConfigInputBox } from "../step_per_mm_box";

interface MotorsProps {
  hidePanel: boolean;
  dispatch: Function;
  bot: BotState;
}
export function Motors({ hidePanel, dispatch, bot }: MotorsProps) {
  let { mcu_params } = bot.hardware;

  return <div hidden={hidePanel}>
    <h2>Motors</h2>
    <table>
      <NumericMCUInputGroup hidden={hidePanel}
        name={t("Timeout after (seconds)")}
        tooltip={t(ToolTips.TIMEOUT_AFTER)}
        x={"movement_timeout_x"}
        y={"movement_timeout_y"}
        z={"movement_timeout_z"}
        bot={bot}
        dispatch={dispatch}
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
      <NumericMCUInputGroup
        hidden={hidePanel}
        name={t("Minimum Speed (steps/s)")}
        tooltip={t(ToolTips.MIN_SPEED)}
        x={"movement_min_spd_x"}
        y={"movement_min_spd_y"}
        z={"movement_min_spd_z"}
        bot={bot}
        dispatch={dispatch}
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
          <SpacePanelToolTip tooltip={t(ToolTips.ENABLE_X2_MOTOR)} />
        </td>
        <td>
          <ToggleButton
            toggleval={mcu_params.movement_secondary_motor_x}
            toggleAction={() => settingToggle("movement_secondary_motor_x", bot)}
          />
        </td>
      </tr>
      <tr hidden={hidePanel}>
        <td>
          <label>{t("Invert Motor")}</label>
          <SpacePanelToolTip tooltip={t(ToolTips.INVERT_MOTORS)} />
        </td>
        <td>
          <ToggleButton
            toggleval={mcu_params.movement_secondary_motor_invert_x}
            toggleAction={() => settingToggle("movement_secondary_motor_invert_x", bot)}
          />
        </td>
      </tr>
      <tr hidden={hidePanel}>
        <NumericMCUInputGroup
          name={t("Max Speed (steps/s)")}
          tooltip={t(ToolTips.MAX_SPEED)}
          x={"movement_max_spd_x"}
          y={"movement_max_spd_y"}
          z={"movement_max_spd_z"}
          bot={bot}
          dispatch={dispatch} />
        <NumericMCUInputGroup
          hidden={hidePanel}
          name={t("Accelerate for (steps)")}
          tooltip={t(ToolTips.ACCELERATE_FOR)}
          x={"movement_steps_acc_dec_x"}
          y={"movement_steps_acc_dec_y"}
          z={"movement_steps_acc_dec_z"}
          bot={bot}
          dispatch={dispatch} />
        <td>
          <label>{t("Steps per MM")}</label>
          <SpacePanelToolTip tooltip={t(ToolTips.STEPS_PER_MM)} />
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
    </table>
  </div>;
}
