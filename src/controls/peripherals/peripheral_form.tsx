import * as React from "react";
import { Peripheral, EditorMode } from "./interfaces";
import { updatePeripheral } from "./actions";
import { t } from "i18next";
import { ToggleButton } from "../toggle_button";
import { pinToggle } from "../../devices/actions";
import { Pin } from "farmbot/dist/interfaces";
import { BlurableInput } from "../../blurable_input";

interface PeripheralFormProps {
    peripheral: Peripheral;
    /** The physical pin that the peripheral is bound to. */
    pin: Pin;
    /** Determines the state of the editor block. */
    editorMode: EditorMode;
    /** Where to find the device within state.peripheral.all */
    index: number;
    dispatch: Function;
}

export function PeripheralForm(props: PeripheralFormProps) {
    if (props.editorMode === "editing") {
        return <PeripheralFormEdit {...props} />;
    } else {
        return <PeripheralFormControl {...props} />;

    };
};

function PeripheralFormControl({peripheral, pin}: PeripheralFormProps) {
    return <div className="row">
        <div className="col-sm-4">
            <label>{peripheral.label}</label>
        </div>

        <div className="col-sm-4">
            <p>{t("Pin {{num}}", { num: peripheral.pin })}</p>
        </div>

        <div className="col-sm-4">
            <ToggleButton toggleval={pin.value}
                toggleAction={() => pinToggle(pin.value)} />
        </div>
    </div>;
};


class PeripheralFormEdit extends React.Component<PeripheralFormProps, {}> {
    commitLabel(e: React.FormEvent) {
        let label = (e.target as HTMLInputElement).value;
        this.props.dispatch(updatePeripheral({
            index: this.props.index,
            peripheral: { label }
        }));
    }

    commitPin(e: React.FormEvent) {
        let pin = parseInt((e.target as HTMLInputElement).value, 10);
        this.props.dispatch(updatePeripheral({
            index: this.props.index,
            peripheral: { pin }
        }));
    }

    render() {
        let { peripheral } = this.props;
        return <div className="row">
            <div className="col-sm-4">
                <BlurableInput value={peripheral.label}
                    onCommit={this.commitLabel.bind(this)} />
            </div>
            <div className="col-sm-4">
                <BlurableInput type="number"
                    value={peripheral.pin.toString()}
                    onCommit={this.commitPin.bind(this)} />
            </div>
            <div className="col-sm-4">
                <button className="button-like red">X</button>
            </div>
        </div>;
    }
};
