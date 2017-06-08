import * as React from "react";
import { McuInputBoxProps } from "../interfaces";
import { updateMCU } from "../actions";
import { BlurableInput } from "../../ui/index";
import { clampUnsignedInteger } from "../../util";
import { warning } from "../../ui/logger";
import { t } from "i18next";

export class McuInputBox extends React.Component<McuInputBoxProps, {}> {
  get key() { return this.props.setting; }

  get value() {
    let v = this.props.bot.hardware.mcu_params[this.key];
    return _.isUndefined(v) ? "" : (v || 0).toString();
  }

  commit = (e: React.SyntheticEvent<HTMLInputElement>) => {
    let val = e.currentTarget;
    let actuallyDifferent = this.value !== val.value;
    if (actuallyDifferent) {
      console.log("Hello?")
      let result = clampUnsignedInteger(val.value);
      switch (result.outcome) {
        case "ok": break;
        case "high":
          warning(t("Maximum input is 32,000. Rounding down."));
          break;
        case "low":
          warning(t("Must be a positive number. Rounding up to 0."));
          break;
        default:
          warning(t("Please enter a number between 0 and 32,000"));
          throw new Error("Bad input in mcu_input_box. Impossible?");
      }
      this.props.dispatch(updateMCU(this.key, result.result.toString()));
    }
  }

  render() {
    return <td>
      <BlurableInput type="number" value={this.value} onCommit={this.commit} />
    </td>;
  }
}
