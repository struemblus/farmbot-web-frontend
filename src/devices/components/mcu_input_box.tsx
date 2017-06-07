import * as React from "react";
import { McuInputBoxProps } from "../interfaces";
import { updateMCU } from "../actions";
import { BlurableInput } from "../../ui/index";

export class McuInputBox extends React.Component<McuInputBoxProps, {}> {
  get key() { return this.props.setting; }

  get value() {
    let v = this.props.bot.hardware.mcu_params[this.key];
    return _.isUndefined(v) ? "" : (v || 0).toString();
  }

  commit = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let t = e.currentTarget;
    if (this.value !== t.value) {
      this.props.dispatch(updateMCU(this.key, t.value));
    }
  }

  render() {
    return <td>
      <BlurableInput type="number" value={this.value} onCommit={this.commit} />
    </td>;
  }
}
