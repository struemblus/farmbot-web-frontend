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
    dispatch: Function;
    bot: BotState;
}

interface State {
    x?: number | undefined;
    y?: number | undefined;
    z?: number | undefined;
    /** TODO: HACK: Needed a quick way to reset internal state of 
     */
    sorry: number;
}
export class AxisInputBoxGroup extends React.Component<Props, Partial<State>> {
    constructor() {
        super();
        this.clicked = this.clicked.bind(this);
        this.change = this.change.bind(this);
        this.state = { sorry: 0 };
    }

    change(axis: keyof Vector, val: number) {
        this.setState({ [axis]: val });
    }

    clicked() {
        let [x, y, z] = this.props.bot.hardware.location;
        let rly = { ...{ x, y, z }, ...this.state };
        this.props.onCommit(rly);
        this.setState({
            x: undefined,
            y: undefined,
            z: undefined,
            sorry: this.state.sorry + 3
        });
    }

    render() {
        let [x, y, z] = this.props.bot.hardware.location;
        return (
            <div>
                <AxisInputBox
                    key={this.state.sorry}
                    axis="x"
                    label="X AXIS"
                    value={x}
                    onChange={this.change} />
                <AxisInputBox
                    key={1 + this.state.sorry}
                    axis="y"
                    label="Y AXIS"
                    value={y}
                    onChange={this.change} />
                <AxisInputBox
                    key={2 + this.state.sorry}
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