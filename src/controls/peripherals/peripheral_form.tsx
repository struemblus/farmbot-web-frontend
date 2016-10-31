import * as React from "react";
import { Peripheral } from "./interfaces";
import { t } from "i18next";
import { ToggleButton } from "../toggle_button";
import { pinToggle } from "../../devices/actions";
import { Pin } from "farmbot/dist/interfaces";

interface PeripheralFormProps {
    peripheral: Peripheral;
    pin: Pin;
}

export function PeripheralForm({peripheral, pin}: PeripheralFormProps) {
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
