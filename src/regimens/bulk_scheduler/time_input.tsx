import * as React from "react";
import { setTimeOffset } from "./actions";
import { duration } from "moment";
import { t } from "i18next";

interface TimeInputProps {
  dispatch: Function;
  /** milliseconds from midnight */
  offset: number;
}

interface TimeInputState {
  val: string;
}

export class TimeInput extends React.Component<TimeInputProps, TimeInputState> {
  public isEditing: boolean;
  constructor() {
    super();
    this.state = { val: "00:01" };
  }

  formatMs(ms: number) {
    if (_.isNumber(ms)) {
      let d = duration(ms);
      let h = _.padLeft(d.hours().toString(), 2, "0");
      let m = _.padLeft(d.minutes().toString(), 2, "0");
      return `${h}:${m}`;
    } else {
      return "00:01";
    }
  }

  get value(): string {
    if (this.isEditing) {
      return this.state.val;
    } else {
      return this.formatMs(this.props.offset);
    }
  }

  focus() {
    this.isEditing = true;
  }

  blur(dispatch: Function) {
    return (event: React.FormEvent) => {
      // Split on ":".
      let [hours, minutes] = (event.target as HTMLInputElement)
        .value
        .split(":")
        .map((n: string) => parseInt(n, 10));

      dispatch(setTimeOffset({ hours, minutes }));
      this.isEditing = false;
    };
  }

  render() {
    return <div>
      <label>{t("Time")}</label>
      <input onFocus={this.focus.bind(this)}
        type="time"
        value={this.value}
        onChange={(event) => {
          this.setState({
            val: (event.target as HTMLInputElement).value
          });
        } }
        onBlur={this.blur(this.props.dispatch).bind(this)} />
    </div>;
  }
}
