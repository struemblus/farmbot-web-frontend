import * as React from "react";
import { t } from "i18next";
import * as I from "farmbot/dist/bot_commands";

interface CalibrationButtonProps {
    target: I.CalibrationTarget;
}

export function CalibrationButton({target}: CalibrationButtonProps) {
    return <button type="button"
        className="button-like yellow">
        {t("CALIBRATE Y")}
    </button>;
}