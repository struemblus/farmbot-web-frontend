import * as React from "react";
import { t } from "i18next";
import { emergencyLock, emergencyUnlock } from "../actions";
import { Everything } from "../../interfaces";

export class EStopButton extends React.Component<Everything, {}> {
    render() {
        let { locked } = this.props.bot.hardware.informational_settings;
        let toggleEmergencyLock = locked ? emergencyUnlock : emergencyLock;
        let emergencyLockStatusColor = locked ? "green" : "red";
        let emergencyLockStatusText = locked ? "START" : "E-STOP";
        if (this.props.auth) {
            return <div>
                <button className={`red widget-control button-like 
                    ${emergencyLockStatusColor}`}
                    type="button"
                    onClick={toggleEmergencyLock}>
                    {t(emergencyLockStatusText)}
                </button>
            </div>;
        } else {
            return <span></span>;
        }

    }
}
