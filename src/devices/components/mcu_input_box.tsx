import * as React from "react";
import { McuInputBoxProps } from "../interfaces";
import { safeStringFetch } from "../../util";
import { McuParams, McuParamName } from "farmbot";
import { changeSettingsBuffer } from "../actions";
import { BlurableInput } from "../../ui/index";

export class McuInputBox extends React.Component<McuInputBoxProps, {}> {

  change(key: McuParamName, dispatch: Function) {
    return function (event: React.FormEvent<HTMLInputElement>) {
      dispatch(changeSettingsBuffer(key, event.currentTarget.value));
    };
  }

  get value() {
    let _value = this.props.bot[this.props.setting];
    if (_.isUndefined(_value)) {
      return "";
    } else {
      return JSON.stringify(_value);
    }
  }

  render() {
    return <td>
      <BlurableInput type="number"
        onCommit={this.change(this.props.setting, this.props.dispatch)}
        value={this.value} />
    </td>;
  }
}
