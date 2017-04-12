import * as React from "react";
import { changeConfigBuffer } from "../actions";
import { BlurableInput } from "../../ui/index";
import { StepsPerMMBoxProps } from "../interfaces";
import { Xyz } from "farmbot/dist";

/** Steps per mm is not an actual Arduino command.
 * We needed to fake it on the UI layer to give the appearance that the settings
 * all come from the same place. */
export class StepPerMMBox extends React.Component<StepsPerMMBoxProps, {}> {
  get axis(): Xyz { return this.props.axis; }
  get primary() {
    let cb = this.props.bot.configBuffer;
    let val = cb && cb.steps_per_mm && cb.steps_per_mm[this.axis];
    return _.isNumber(val) ? val.toString() : "";
  }
  get secondary() {
    let c = this.props.bot.hardware.configuration;
    let val = c && c.steps_per_mm && c.steps_per_mm[this.axis];
    return _.isNumber(val) ? val.toString() : "";
  }
  get value() {
    return this.primary || this.secondary;
  }
  change(key: Xyz, dispatch: Function) {
    return function (event: React.FormEvent<HTMLInputElement>) {
      let formInput = event.currentTarget.value;
      dispatch(changeConfigBuffer({ steps_per_mm: { [key]: Number(formInput) } }));
    };
  }
  render() {
    return <td>
      <BlurableInput type="number"
        onCommit={this.change(this.props.axis, this.props.dispatch)}
        value={this.value} />
    </td>;
  }
}
