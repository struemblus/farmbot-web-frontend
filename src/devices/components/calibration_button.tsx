import * as React from "react";
import { t } from "i18next";
import { CalibrationTarget } from "farmbot/dist/bot_commands";
import { devices } from "../../device";

interface CalibrationButtonProps {
    target: CalibrationTarget;
}

function calibrate(target: CalibrationTarget) {
    devices
        .current
        .calibrate(target)
        .then(function() {
            console.log("WOO HOO!");
        }, function() {
            console.log("Doh!");
        });
}

export function CalibrationButton({target}: CalibrationButtonProps) {
    return <button type="button"
        className="button-like yellow"
        onClick={() => calibrate(target)}>
        {t("CALIBRATE {{target}}", { target })}
    </button>;
};
