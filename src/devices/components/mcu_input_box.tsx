import * as React from "react";
import { McuInputBoxProps } from "../interfaces";
import { updateMCU } from "../actions";
import { BlurableInput } from "../../ui/index";

export class McuInputBox extends React.Component<McuInputBoxProps, {}> {
  get key() { return this.props.setting; }
  get dispatch() { return this.props.dispatch; }
  get value() {
    let v = this.props.bot.hardware.mcu_params[this.key];
    return _.isUndefined(v) ? "---" : (v || 0).toString();
  }

  render() {
    return <td>
      <BlurableInput type="number" onCommit={(e) => {
        this.dispatch(updateMCU(this.key, e.currentTarget.value));
      }}
        value={this.value} />
    </td>;
  }
}
