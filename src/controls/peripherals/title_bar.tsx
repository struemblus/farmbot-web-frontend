import * as React from "react";
import { startEditing, startControlling } from "./actions";
import { PeripheralState } from "./interfaces";
import { t } from "i18next";

interface TitleBarProps extends PeripheralState { dispatch: Function; }

export function TitleBar(props: TitleBarProps) {
    if (props.editorMode === "controlling") {
        console.log("DING");
        return <TitleBarControlling {...props} />;
    } else {
        console.log("DONG");
        return <TitleBarEditing {...props} />;
    };
}

function TitleBarEditing(props: TitleBarProps) {
    return <div className="col-sm-12">
        <button
            className="gray button-like widget-control"
            type="button"
            onClick={() => props.dispatch(startControlling())}>
            {t("EDIT")}
        </button>
        <div className="widget-header">
            <h5>Peripherals</h5>
            <i className="fa fa-question-circle widget-help-icon">
                <div className="widget-help-text">
                    {t(`Use these toggle
                        switches to control FarmBot's peripherals and peripherals
                        in realtime. To edit and create new peripherals, press
                        the button. Make sure to turn
                        things off when you're done!`)}
                </div>
            </i>
        </div>
    </div>;
}

function TitleBarControlling(props: TitleBarProps) {
    return <div className="col-sm-12">
        <button
            className="gray button-like widget-control"
            type="button"
            onClick={() => props.dispatch(startEditing())}>
            {t("CANCEL")}
        </button>
        <div className="widget-header">
            <h5>Peripherals</h5>
            <i className="fa fa-question-circle widget-help-icon">
                <div className="widget-help-text">
                    {t(`Use these toggle
                        switches to control FarmBot's peripherals and peripherals
                        in realtime. To edit and create new peripherals, press
                        the button. Make sure to turn
                        things off when you're done!`)}
                </div>
            </i>
        </div>
    </div>;
}
