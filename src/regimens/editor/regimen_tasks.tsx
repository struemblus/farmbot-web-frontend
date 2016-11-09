import * as React from "react";
import { RegimenProps } from "../interfaces";
import { BotState } from "../../devices/interfaces";
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

        let gray = <button className="gray button-like widget-control"
            onClick={() => { } }>
            {t("Start")}
        </button>;

        let current_regimens = bot.hardware.farm_scheduler.process_info;
        let result = current_regimens.find((item, index, array) => {
            return item.regimen.id === regimen.id;
        });
        if (result != undefined) {
            // if the status is normal (already running) display the gray button.
            return result.info.status == "normal" ? gray : yesButton;
        } else {
            // if the regimen is not in the list
            // display the start button.
            return yesButton;
        }
    }
}

export function StopButton({regimen, bot}: TaskProps) {
    if (!regimen) { return <span />; } else {
        let yesButton = <button className="red button-like widget-control"
            onClick={() => stopRegimen(regimen)}>
            {t("Stop")}
        </button>;

        let grayButton = <button className="gray button-like widget-control"
            onClick={() => { } }>
            {t("Stop")}
        </button>;

        if (!regimen) { return <span />; };
        if (regimen.dirty == true) { return <span />; }
        let current_regimens = bot.hardware.farm_scheduler.process_info;
        let result = current_regimens.find((item, index, array) => {
            return item.regimen.id === regimen.id;
        });
        if (result != undefined) {
            // if the status is normal (already running) display the red button.
            return result.info.status == "normal" ? yesButton : grayButton;
        } else {
            // if the regimen is not in the list,
            // we don't want to be able to stop it.
            // because its not started.
            return grayButton;
        }
    }
}
