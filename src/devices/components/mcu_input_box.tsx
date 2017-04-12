import * as React from "react";
import { McuInputBoxProps } from "../interfaces";
import { safeStringFetch } from "../../util";
import { McuParams, McuParamName } from "farmbot";
import { changeSettingsBuffer } from "../actions";
import { BlurableInput } from "../../ui/index";

export class McuInputBox extends React.Component<McuInputBoxProps, {}> {
  get key() { return this.props.setting; }
  get dispatch() { return this.props.dispatch; }
  get value() {
    let { settingsBuffer, hardware } = this.props.bot;
    let _value = settingsBuffer[this.key] || hardware.mcu_params[this.key];
    return _.isUndefined(_value) ? "" : JSON.stringify(_value);
  }

  render() {
    return <td>
      <BlurableInput type="number"
        onCommit={(e) => {
          let action = changeSettingsBuffer(this.key, e.currentTarget.value);
          this.dispatch(action);
        }}
        value={this.value} />
    </td>;
  }
}
