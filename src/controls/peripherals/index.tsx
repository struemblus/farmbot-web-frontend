import * as React from "react";
import { t } from "i18next";
import { ToggleButton } from "../toggle_button";
import { Pin, Pins } from "farmbot/dist/interfaces";
import { Everything } from "../../interfaces";
import { pinToggle } from "../../devices/actions";
import { TitleBar } from "./title_bar";

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
            <TitleBar {...this.props.peripherals}
                dispatch={this.props.dispatch} />
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