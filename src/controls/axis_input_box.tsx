import * as React from "react";
import { AxisInputBoxProps } from "./interfaces";
import { changeAxisBuffer } from "../devices/actions";

export class AxisInputBox extends React.Component<AxisInputBoxProps, {}> {
    primary(): string {
        return this.props.bot.axisBuffer[this.props.axis] || "";
    }

    secondary(): string {
        const axisTranslation: { [axis: string]: number } = { x: 0, y: 1, z: 2 };
        let axisNumber = axisTranslation[this.props.axis];
        let num = this.props.bot.hardware.location[axisNumber];
        if (_.isNumber(num)) {
            return String(num); // Prevent 0 from being falsy.
        } else {
            return num;
        };
    }

    style() {
        return { border: (this.primary()) ? "1px solid red" : "" };
    }

    change(key: string, dispatch: Function):
        React.EventHandler<React.FormEvent<HTMLInputElement>> {
        return function (event) {
            let num = Number(event.currentTarget.value);
            dispatch(changeAxisBuffer(key, num));
        };
    }

    render() {
        return <div className="col-xs-3">
            <label>{this.props.label}</label>
            <input className="move-input"
                type="text"
                style={this.style()}
                onChange={this.change(this.props.axis, this.props.dispatch)}
                value={this.primary() || this.secondary() || "---"} />
        </div>;
    }
}