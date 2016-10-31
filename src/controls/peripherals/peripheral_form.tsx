import * as React from "react";
import { Peripheral, EditorMode } from "./interfaces";
import { t } from "i18next";
import { ToggleButton } from "../toggle_button";
import { pinToggle } from "../../devices/actions";
import { Pin } from "farmbot/dist/interfaces";

interface PeripheralFormProps {
    peripheral: Peripheral;
    pin: Pin;
    editorMode: EditorMode;
}

export function PeripheralForm(props: PeripheralFormProps) {
    if (props.editorMode === "editing") {
        return <PeripheralFormEdit {...props} />;
    } else {
        return <PeripheralFormControl {...props} />;

    };
};

function PeripheralFormEdit({peripheral, pin}: PeripheralFormProps) {
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


function PeripheralFormControl({peripheral, pin}: PeripheralFormProps) {
    return <div className="row">
        <div className="col-sm-4">
            <input type="test" defaultValue={peripheral.label} />
        </div>
        <div className="col-sm-4">
            <input type="number" defaultValue={peripheral.pin.toString()} />
        </div>
        <div className="col-sm-4">
            <button className="button-like red">X</button>
        </div>
    </div>;
};
