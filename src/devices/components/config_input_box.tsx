import * as React from "react";
import { changeConfigBuffer } from "../actions";
import { BlurableInput } from "../../ui/index";
import { StepsPerMMBoxProps } from "../interfaces";

export class StepPerMMBox extends React.Component<StepsPerMMBoxProps, {}> {
  change(key: string, dispatch: Function) {
    return function (event: React.FormEvent<HTMLInputElement>) {
      let formInput = event.currentTarget.value;
      dispatch(changeConfigBuffer({ [key]: Number(formInput) }));
    };
  }
  get key() { return this.props.setting; }
  get value() {
    let config = this.props.bot.configBuffer;
    return "";//.steps_per_mm[this.props.setting];
  }
  render() {

    return <td>
      <BlurableInput type="number"
        onCommit={this.change(this.props.setting, this.props.dispatch)}
        value={this.value} />
    </td>;
  }
}
