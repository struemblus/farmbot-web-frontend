import * as React from "react";
import { McuInputBox } from "./mcu_input_box";
import { BotState } from "../interfaces";
import { McuParamName } from "farmbot/dist";

export interface NumericMCUInputGroupProps {
  bot: BotState;
  dispatch: Function;
  tooltip?: string | undefined;
  name: string;
  x: McuParamName;
  y: McuParamName;
  z: McuParamName;
}

export function NumericMCUInputGroup(props: NumericMCUInputGroupProps) {
  let {
    bot,
    dispatch,
    tooltip,
    name,
    x,
    y,
    z
  } = props;
  return <tr>
    <td>
      <label>{name}</label>
      {(tooltip && <div className="help">
        <i className="fa fa-question-circle help-icon" />
        <div className="help-text">
          {tooltip}
        </div>
      </div>)}
    </td>
    <McuInputBox setting={x} bot={bot} dispatch={dispatch} />
    <McuInputBox setting={y} bot={bot} dispatch={dispatch} />
    <McuInputBox setting={z} bot={bot} dispatch={dispatch} />
  </tr>;
}
