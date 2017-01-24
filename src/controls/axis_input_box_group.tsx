import * as React from "react";
import { AxisInputBox } from "./axis_input_box";
import { BotState } from "../devices/interfaces";

interface AxisInputBoxGroupProps {
    onCommit: Function;
    dispatch: Function;
    bot: BotState;
}

export class AxisInputBoxGroup extends React.Component<AxisInputBoxGroupProps, {}> {
    render() {
        return (
            <div>
                <AxisInputBox axis="x" label="X AXIS" {...this.props} />
                <AxisInputBox axis="y" label="Y AXIS" {...this.props} />
                <AxisInputBox axis="z" label="Z AXIS" {...this.props} />
                <div className="col-xs-3">
                    <button onClick={() => this.props.onCommit()}
                        className="full-width green button-like go">
                        GO
                  </button>
                </div>
            </div>);
    }
}