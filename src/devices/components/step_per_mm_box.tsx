import * as React from "react";
import { BlurableInput } from "../../ui/index";
import { StepsPerMMBoxProps } from "../interfaces";
import { Xyz, ConfigurationName } from "farmbot/dist";
import { updateConfig } from "../actions";

/** Steps per mm is not an actual Arduino command.
 * We needed to fake it on the UI layer to give the appearance that the settings
 * all come from the same place. */
export class BotConfigInputBox extends React.Component<StepsPerMMBoxProps, {}> {
  get setting() { return this.props.setting; }
  get config() { return this.props.bot.hardware.configuration; }

  change(key: ConfigurationName, dispatch: Function) {
    return function (event: React.FormEvent<HTMLInputElement>) {
      let formInput = event.currentTarget.value;
      dispatch(updateConfig({ [key]: formInput }));
    };
  }
  render() {
    return <td>
      <BlurableInput type="number"
        onCommit={this.change(this.props.setting, this.props.dispatch)}
        value={"123" /*this.value*/} />
    </td>;
  }
}
