import * as React from "react";
import { Pin, Pins } from "farmbot/dist/interfaces";
import { Everything } from "../../interfaces";
import { TitleBar } from "./title_bar";
import { PeripheralForm } from "./peripheral_form";
import { Peripheral } from "./interfaces";

export class Peripherals extends React.Component<Everything, {}> {
    getPin(p: Peripheral, pins: Pins): Pin {
        let pin = pins[p.pin];
        if (pin) {
            return pin;
        } else {
            return {
                mode: 0,
                value: -1
            };
        }
    }
    peripherals() {
        let pins = this.props.bot.hardware.pins;
        return this
            .props
            .peripherals
            .all
            .map((p, i) => {
                return <PeripheralForm key={i}
                    dispatch={this.props.dispatch}
                    index={i}
                    pin={this.getPin(p, pins)}
                    peripheral={p}
                    editorMode={this.props.peripherals.editorMode} />;
            });
    }
    render() {
        return (<div>
            <TitleBar {...this.props.peripherals}
                dispatch={this.props.dispatch} />
            <div className="col-sm-12">
                <div className="widget-content no-bottom-padding">
                    {this.peripherals.call(this)}
                </div>
            </div></div>);
    };
}