import * as React from "react";
import { McuInputBox } from "./mcu_input_box";
import { BotState } from "../interfaces";
import { McuParamName } from "farmbot/dist";
import { SpacePanelToolTip } from "./space_panel_tool_tip";

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

export function NumericMCUInputGroup(props: NumericMCUInputGroupProps) {
  let { bot, dispatch, tooltip, name, x, y, z, hidden } = props;
  return <tr hidden={!!hidden}>
    <td>
      <label>{name}</label>
      <SpacePanelToolTip tooltip={tooltip} />
    </td>
    <McuInputBox setting={x} bot={bot} dispatch={dispatch} />
    <McuInputBox setting={y} bot={bot} dispatch={dispatch} />
    <McuInputBox setting={z} bot={bot} dispatch={dispatch} />
  </tr>;
}
