import * as React from "react";
import { BotState } from "../interfaces";
import { McuParamName } from "farmbot/dist";
import { ToggleButton } from "../../controls/toggle_button";
import { SpacePanelToolTip } from "./space_panel_tool_tip";
import { settingToggle } from "../actions";

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

export function BooleanMCUInputGroup(props: BooleanMCUInputGroupProps) {
  let {
    bot,
    dispatch,
    tooltip,
    name,
    x,
    y,
    z,
    disableX,
    disableY,
    disableZ,
    hidden
  } = props;
  let { mcu_params } = bot.hardware;
  return <tr hidden={!!hidden}>
    <td>
      <label>{name}</label>
      <SpacePanelToolTip tooltip={tooltip} />
    </td>
    <td>
      <ToggleButton disabled={disableX}
        toggleval={mcu_params[x]}
        toggleAction={() => settingToggle(x, bot)} />
    </td>
    <td>
      <ToggleButton disabled={disableY}
        toggleval={mcu_params[y]}
        toggleAction={() => settingToggle(y, bot)} />
    </td>
    <td>
      <ToggleButton disabled={disableZ}
        toggleval={mcu_params[z]}
        toggleAction={() => settingToggle(z, bot)} />
    </td>
  </tr>;
}
