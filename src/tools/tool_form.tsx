import * as React from "react";
import { ToolsFormProps, ToolsFormState } from "./interfaces";
import { BlurableInput } from "../../blurable_input";

export class ToolsForm extends React.Component<ToolsFormProps, ToolsFormState> {
    constructor() {
        super();
        this.set = this.set.bind(this);
        this.submit = this.submit.bind(this);
        this.state = { label: "", x: 0, y: 0, z: 0 };
    }

    set() {
        console.log("SET");
    }

    submit() {
        console.log("SUBMIT");
    }

    render() {
        let { set, submit } = this;
        let { label, x, y, z } = this.state;

        return <div className="row">
            <div className="col-sm-4">
                <BlurableInput value={label}
                    type="text"
                    onCommit={set} />
            </div>

            <div className="col-sm-2">
                <BlurableInput value={(x).toString()}
                    type="number"
                    name="x"
                    onCommit={set} />
            </div>

            <div className="col-sm-2">
                <BlurableInput value={(y).toString()}
                    type="number"
                    name="y"
                    onCommit={set} />
            </div>

            <div className="col-sm-2">
                <BlurableInput value={(z).toString()}
                    type="number"
                    name="z"
                    onCommit={set} />
            </div>

            <div className="col-sm-2">
                <button className="button-like green"
                    onClick={submit}>+</button>
            </div>
        </div>;
    }
};
