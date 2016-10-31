import * as React from "react";
import { t } from "i18next";
import { ToggleButton } from "../toggle_button";
import { Pin, Pins } from "farmbot/dist/interfaces";
import { Everything } from "../../interfaces";
import { pinToggle } from "../../devices/actions";

export class Peripherals extends React.Component<Everything, {}> {
    getPin(pin: number, pins: Pins): Pin {
        let p = pins[pin];
        if (p) {
            return p;
        } else {
            return {
                mode: 0,
                value: -1
            };
        }
    }
    render() {
        return (<div>
            <div className="col-sm-12">
                <button
                    className="gray button-like widget-control"
                    type="button">
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
                              things off when you're done! Coming soon: a working
                              edit button.`)}
                        </div>
                    </i>
                </div>
            </div>
            <div className="col-sm-12">
                <div className="widget-content no-bottom-padding">
                    <div className="row">
                        <div className="col-sm-4">
                            <label>{t("VACUUM PUMP")}</label>
                        </div>
                        <div className="col-sm-4">
                            <p>{t("Pin 9")}</p>
                        </div>
                        <div className="col-sm-4">
                            <ToggleButton toggleval={
                                this.getPin(9, this.props.bot.hardware.pins).value
                            }
                                toggleAction={() => pinToggle(9)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <label>{t("WATER VALVE")}</label>
                        </div>
                        <div className="col-sm-4">
                            <p>{t("Pin 10")}</p>
                        </div>
                        <div className="col-sm-4">
                            <ToggleButton toggleval={
                                this.getPin(10, this.props.bot.hardware.pins).value}
                                toggleAction={() => pinToggle(10)} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <label>{t("LED")}</label>
                        </div>
                        <div className="col-sm-4">
                            <p>{t("Pin 13")}</p>
                        </div>
                        <div className="col-sm-4">
                            <ToggleButton toggleval={
                                this.getPin(13, this.props.bot.hardware.pins).value}
                                toggleAction={() => pinToggle(13)} />
                        </div>
                    </div>
                </div>
            </div></div>);
    };
}