import * as React from "react";
import { t } from "i18next";
import { BooleanMCUInputGroup } from "../boolean_mcu_input_group";
import { ToolTips } from "../../../constants";
import { BotState } from "../../interfaces";

interface EndStopsProps {
  hidePanel: boolean;
  dispatch: Function;
  bot: BotState;
}
export function EndStops({ hidePanel, dispatch, bot }: EndStopsProps) {
  return <div hidden={hidePanel}>
    <h2>End Stops</h2>
    <table>
      <BooleanMCUInputGroup
        hidden={hidePanel}
        name={t("Invert Endstops")}
        tooltip={t(ToolTips.INVERT_ENDPOINTS)}
        x={"movement_invert_endpoints_x"}
        y={"movement_invert_endpoints_y"}
        z={"movement_invert_endpoints_z"}
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
    </table>
  </div>;
}
