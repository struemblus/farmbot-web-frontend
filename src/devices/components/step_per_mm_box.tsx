import * as React from "react";
import { changeConfigBuffer } from "../actions";
import { BlurableInput } from "../../ui/index";
import { StepsPerMMBoxProps } from "../interfaces";
import { Xyz, ConfigurationName } from "farmbot/dist";

/** Steps per mm is not an actual Arduino command.
 * We needed to fake it on the UI layer to give the appearance that the settings
 * all come from the same place. */
export class BotConfigInputBox extends React.Component<StepsPerMMBoxProps, {}> {
  get setting() { return this.props.setting; }
  get buffer() { return this.props.bot.configBuffer; }
  get config() { return this.props.bot.hardware.configuration; }
  get primary() {
    let val = this.buffer && this.buffer[this.setting];
    return _.isNumber(val) ? val.toString() : "";
  }
  get secondary() {
    let val = this.config && this.config[this.setting];
    return _.isNumber(val) ? val.toString() : "";
  }
  get value() {
    return this.primary || this.secondary;
  }
  change(key: ConfigurationName, dispatch: Function) {
    return function (event: React.FormEvent<HTMLInputElement>) {
      let formInput = event.currentTarget.value;
      dispatch(changeConfigBuffer({ [key]: Number(formInput) }));
    };
  }
  render() {
    return <td>
      <BlurableInput type="number"
        onCommit={this.change(this.props.setting, this.props.dispatch)}
        value={this.value} />
    </td>;
  }
}
