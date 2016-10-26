import * as React from "react";
import { RegimenProps } from "../interfaces";
import { BotState } from "../../devices/interfaces";
import { Regimen } from "../interfaces";
import { Sequence } from "../../sequences/interfaces";
import { startRegimen, stopRegimen } from "../../devices/actions";
import { t } from "i18next";

interface TaskProps extends RegimenProps {
    bot: BotState;
};

export function StartButton({regimen, bot}: TaskProps) {
    if (!regimen) { return <span />; } else {
        if (regimen.dirty == true) { return <span />; }
        let yesButton = <button className="green button-like widget-control"
            onClick={() => startRegimen(regimen)}>
            {t("Start")}
        </button>;

        let noButton = <button className="gray button-like widget-control"
            onClick={() => { } }>
            {t("Start")}
        </button>;

        let runningRegimens = bot.hardware.farm_events.running_regimens;
        // if the regimen is not running
        // debugger;
        let r = runningRegimens.filter(function (sub_regimen: Regimen) {
            return regimen.id == sub_regimen.id;
        });
        if (r.length == 0) {
            return yesButton;
        } else {
            return noButton;
        }
    }
}

export function StopButton({regimen, bot}: TaskProps) {
    if (!regimen) { return <span />; } else {
        let yesButton = <button className="red button-like widget-control"
            onClick={() => stopRegimen(regimen)}>
            {t("Stop")}
        </button>;

        let noButton = <button className="gray button-like widget-control"
            onClick={() => { } }>
            {t("Stop")}
        </button>;

        if (!regimen) { return <span />; };
        if (regimen.dirty == true) { return <span />; }
        let runningRegimens = bot.hardware.farm_events.running_regimens;
        // if the regimen is running
        let r = runningRegimens.filter(function (sub_regimen: Regimen) {
            return regimen.id == sub_regimen.id;
        });
        if (r.length > 0) {
            return yesButton;
        } else {
            return noButton;
        }
    }
}
