import * as React from "react";
import { AxisInputBox } from "./axis_input_box";
import { BotState } from "../devices/interfaces";
interface Vector {
    x: number;
    y: number;
    z: number;
}
interface Props {
    onCommit: (v: Vector) => void;
    bot: BotState;
}

interface State {
    x?: number | undefined;
    y?: number | undefined;
    z?: number | undefined;
}

export class AxisInputBoxGroup extends React.Component<Props, Partial<State>> {
    constructor() {
        super();
        this.clicked = this.clicked.bind(this);
        this.change = this.change.bind(this);
        this.state = {};
    }

    change(axis: keyof Vector, val: number) {
        this.setState({ [axis]: val });
    }

    get vector() {
        let [x, y, z] = this.props.bot.hardware.location;
        return { ...{ x, y, z }, ...this.state };
    }

    clicked() {
        this.props.onCommit(this.vector);
        this.setState({ x: undefined, y: undefined, z: undefined });
    }

    render() {
        let [x, y, z] = this.props.bot.hardware.location;
        return (
            <div>
                <AxisInputBox
                    axis="x"
                    label="X AXIS"
                    value={x}
                    onChange={this.change} />
                <AxisInputBox
                    axis="y"
                    label="Y AXIS"
                    value={y}
                    onChange={this.change} />
                <AxisInputBox
                    axis="z"
                    label="Z AXIS"
                    value={z}
                    onChange={this.change} />
                <div className="col-xs-3">
                    <button onClick={this.clicked}
                        className="full-width green button-like go">
                        GO
                  </button>
                </div>
            </div>);
    }
}
