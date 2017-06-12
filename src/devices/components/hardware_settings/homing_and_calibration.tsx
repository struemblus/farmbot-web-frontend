import * as React from "react";
import { t } from "i18next";
import { BooleanMCUInputGroup } from "../boolean_mcu_input_group";
import { ToolTips } from "../../../constants";
import { BotState } from "../../interfaces";
import { NumericMCUInputGroup } from "../numeric_mcu_input_group";
import { HomingRow } from "../homing_row";
import { CalibrationRow } from "../calibration_button";
import { ZeroRow } from "../zero_row";
import { enabledAxisMap } from "../axis_tracking_status";

interface HomingAndCalibrationProps {
  hidePanel: boolean;
  dispatch: Function;
  bot: BotState;
}
export function HomingAndCalibration({ hidePanel, dispatch, bot }: HomingAndCalibrationProps) {
  let { mcu_params } = bot.hardware;

  /** Tells us if X/Y/Z have a means of checking their position.
   * FARMBOT WILL CRASH INTO WALLS IF THIS IS WRONG! BE CAREFUL */
  let enabled = enabledAxisMap(mcu_params)
  return <div hidden={hidePanel}>
    <h2>Homing and Calibration</h2>
    <table>
      <BooleanMCUInputGroup
        hidden={hidePanel}
        name={t("Stop at Home")}
        tooltip={t(ToolTips.STOP_AT_HOME)}
        x={"movement_stop_at_home_x"}
        y={"movement_stop_at_home_y"}
        z={"movement_stop_at_home_z"}
        dispatch={dispatch}
        bot={bot} />
      <CalibrationRow
        hidden={hidePanel}
        hardware={mcu_params} />
      <ZeroRow />
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
        name={t("Stop at Max")}
        tooltip={t(ToolTips.STOP_AT_MAX)}
        x={"movement_stop_at_max_x"}
        y={"movement_stop_at_max_y"}
        z={"movement_stop_at_max_z"}
        dispatch={dispatch}
        bot={bot}
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
      <HomingRow
        hidden={hidePanel}
        hardware={mcu_params} />
    </table>
  </div>;
}
