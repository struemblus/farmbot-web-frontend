import * as React from "react";
import { PeripheralFormProps } from "./interfaces";
import { pushPeripheral } from "./actions";
import { error } from "../../logger";
import { t } from "i18next";

export function PeripheralForm(props: PeripheralFormProps) {
    let Comp: JSX.Element;

    if (props.editorMode === "editing") {
        Comp = <PeripheralFormEdit {...props} />;
    } else {
        Comp = <div />;
    }

    return Comp;
}

interface PeripheralFormEditState {
    label?: string;
    pin?: number;
}

class PeripheralFormEdit extends React.Component<PeripheralFormProps,
    PeripheralFormEditState> {
    constructor() {
        super();
        this.state = { label: "" };
    }

    resetState() {
        this.setState({ label: "", pin: undefined });
    }

    commitLabel(e: React.FormEvent) {
        this.setState({ label: (e.target as HTMLInputElement).value });
    }

    commitPin(e: React.FormEvent) {
        this.setState({
            pin: parseInt((e.target as HTMLInputElement).value, 10)
        });
    }

    submit() {
        let { pin, label } = this.state;
        if (label &&
            _.isNumber(pin) &&
            pin &&
            pin > 0) {
            this
                .props
                .dispatch(pushPeripheral({ label, pin }));
            this.resetState();

        } else {
            error(t("Please enter a valid label and pin number."));
        }
    }

    render() {

        return <div className="row">
            <div className="col-sm-4">
                <input type="text"
                    onChange={this.commitLabel.bind(this)}
                    value={this.state.label}
                    />
            </div>

            <div className="col-sm-4">
                <input type="number"
                    value={(this.state.pin || "").toString()}
                    placeholder="Pin #"
                    onChange={this.commitPin.bind(this)} />
            </div>

            <div className="col-sm-4">
                <button className="button-like green"
                    onClick={this.submit.bind(this)}>+</button>
            </div>
        </div>;
    }
};
