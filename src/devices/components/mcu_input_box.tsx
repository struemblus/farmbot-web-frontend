import * as React from "react";
import { McuInputBoxProps } from "../interfaces";
import { updateMCU } from "../actions";
import { BlurableInput } from "../../ui/index";
import { Dictionary } from "farmbot";
import { error } from "../../ui/logger";

let maxValues: Readonly<Dictionary<number>> = {
  "x": 141,
  "y": 142,
  "z": 143
};

export class McuInputBox extends React.Component<McuInputBoxProps, {}> {

  get key() {
    return this.props.setting;
  }

  get value() {
    let v = this.props.bot.hardware.mcu_params[this.key];
    return _.isUndefined(v) ? "" : (v || 0).toString();
  }

  get baseString() {
    /** Not a fan of this at all, but right now this is the only input that
     * requires a condition. */
    return "movement_axis_nr_steps_";
  }

  isValid = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let { setting, name } = this.props;
    let value = parseInt(e.currentTarget.value);
    let condition = setting.includes(this.baseString);
    let invalid = name && value > maxValues[name];
    if (condition && invalid) {
      error(`Invalid ${name} for bot length, ${value} is too large.`);
    } else {
      return true;
    }
  }

  commit = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let t = e.currentTarget;
    if (this.value !== t.value && this.isValid(e)) {
      this.props.dispatch(updateMCU(this.key, t.value));
    }
  }

  render() {
    return <td>
      <BlurableInput
        type="number"
        value={this.value}
        onCommit={e => this.commit(e)}
      />
    </td>;
  }
}
