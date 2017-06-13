import * as React from "react";
import { t } from "i18next";
import { BooleanMCUInputGroup } from "../boolean_mcu_input_group";
import { ToolTips } from "../../../constants";
import { NumericMCUInputGroup } from "../numeric_mcu_input_group";
import { EncodersProps } from "../interfaces";
import { toggleControlPanel } from "../../actions";

export function EncodersAndEndStops(props: EncodersProps) {

  let { encoders_and_endstops } = props.bot.controlPanelState;
  let { hidePanel, dispatch, bot } = props;
  let icon_string = encoders_and_endstops ? "minus" : "plus";

  return <div>
    <h4 onClick={() => dispatch(toggleControlPanel("encoders_and_endstops"))}>
      {t("Encoders and Endstops")}
      <span className="icon-toggle">
        &nbsp;&nbsp;[<i className={`fa fa-${icon_string}`} />]
      </span>
    </h4>
    <div hidden={hidePanel}>
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
        name={t("Use Encoders for Positioning")}
        tooltip={t(ToolTips.ENCODER_POSITIONING)}
        x={"encoder_use_for_pos_x"}
        y={"encoder_use_for_pos_y"}
        z={"encoder_use_for_pos_z"}
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
        name={t("Invert Endstops")}
        tooltip={t(ToolTips.INVERT_ENDPOINTS)}
        x={"movement_invert_endpoints_x"}
        y={"movement_invert_endpoints_y"}
        z={"movement_invert_endpoints_z"}
        dispatch={dispatch}
        bot={bot}
      />
    </div>
  </div>;
}
