import * as React from "react";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { Select } from "../ui";
import { t } from "i18next";
import { ChromePicker } from "react-color";
import { DetectorState } from "./interfaces";
import { ImageFlipper } from ".";
import * as ReactSelect from "react-select";
import { range } from "lodash";
import { devices } from "../device";
// TODO: Submit typings for RC slider.
var Slider = require("rc-slider") as (props: TodoFixThis) => JSX.Element;
require("rc-slider/assets/index.css");
interface TodoFixThis {
    onChange?: (val: number) => void;
    min?: number;
    max?: number;
    onAfterChange?: (val: number) => void;
    range?: boolean;
    allowCross?: boolean;
    defaultValue?: number[];
}


function sliderRange(hi: number, lo: number) {
    return _.range(hi, lo).map(x => ({ value: x.toString(), label: x.toString() }));
}

function hi(i: ReactSelect.Option[]): number {
    return parseInt(String(i[i.length - 1].value), 10);
}

function lo(i: ReactSelect.Option[]): number {
    return parseInt(String(i[0].value), 10);
}

const RANGE = {
    H: sliderRange(0, 179),
    S: sliderRange(0, 255),
    V: sliderRange(0, 255),
    blur: sliderRange(0, 255),
    morph: sliderRange(0, 255),
    iterations: sliderRange(0, 25)
};

@connect((state: Everything) => state)
export class WeedDetector extends React.Component<Everything, Partial<DetectorState>> {
    constructor() {
        super();
        this.state = {
            isEditing: true,
            HUELow: 10,
            HUEHigh: 20,
            saturationLow: 30,
            saturationHigh: 40,
            valueLow: 50,
            valueHigh: 60,
            blur: 1,
            morph: 2,
            iterations: 3,
            time: "12:34pm",
            location: "230, 489, -6,890"
        };
    }
    sendOffConfig() {
        let s = this.state;
        devices
            .current
            .setUserEnv({
                "PLANT_DETECTION.HUELow": String(s.HUELow),
                "PLANT_DETECTION.HUEHigh": String(s.HUEHigh),
                "PLANT_DETECTION.saturationLow": String(s.saturationLow),
                "PLANT_DETECTION.saturationHigh": String(s.saturationHigh),
                "PLANT_DETECTION.valueLow": String(s.valueLow),
                "PLANT_DETECTION.valueHigh": String(s.valueHigh),
                "PLANT_DETECTION.blur": String(s.blur),
                "PLANT_DETECTION.morph": String(s.morph),
                "PLANT_DETECTION.iterations": String(s.iterations),
            });
    }
    toggleEdit() {
        this.setState({ isEditing: !this.state.isEditing });
    }

    temporary(key: keyof DetectorState) {
        return (e: React.FormEvent<HTMLInputElement>) => {
            let str = e.currentTarget.value;
            let num = parseInt(str, 10);
            if (!_.isNaN(num)) {
                return this.setState({ [key]: num });
            }
        }
    }

    render() {
        let isEditing = this.state.isEditing;
        return <div>
            <div className="widget-wrapper weed-detector-widget">
                <div className="row">
                    <div className="col-sm-12">
                        {isEditing && (
                            <div className="widget-header">
                                <button onClick={this.sendOffConfig.bind(this)}
                                    className="green button-like">
                                    {t("SAVE")}
                                </button>
                                <button
                                    className="yellow button-like">
                                    {t("TEST")}
                                </button>
                                <button
                                    className="gray button-like"
                                    onClick={this.toggleEdit.bind(this)}>
                                    {t("BACK")}
                                </button>
                                <h5>{t("Weed Detector")}</h5>
                                <i className={`fa fa-question-circle
                                            widget-help-icon`}>
                                    <div className={`widget-help-text`}>
                                        {t(`Detect Weeds`)}
                                    </div>
                                </i>
                            </div>
                        )}
                        {!isEditing && (
                            <div className="widget-header">
                                <button
                                    className="gray button-like"
                                    onClick={this.toggleEdit.bind(this)}>
                                    {t("EDIT")}
                                </button>
                                <h5>{t("Weed Detector")}</h5>
                                <i className={`fa fa-question-circle
                                            widget-help-icon`}>
                                    <div className={`widget-help-text`}>
                                        {t(`Detect Weeds`)}
                                    </div>
                                </i>
                            </div>
                        )}
                        <div className="row">
                            <div className="col-sm-12">
                                {isEditing && (
                                    <div className="widget-content">
                                        <div className="row">
                                            <div className="col-md-6 col-sm-12">
                                                <h4>
                                                    <i>Color Range</i>
                                                </h4>

                                                <label htmlFor="hue">HUE</label>
                                                <Slider
                                                    min={lo(RANGE.H)}
                                                    max={hi(RANGE.H)}
                                                    range={true}
                                                    allowCross={true}
                                                    defaultValue={[(this.state.HUELow || 0),
                                                    (this.state.HUEHigh || 5)]} />

                                                <label htmlFor="saturation">SATURATION</label>
                                                <Slider
                                                    min={lo(RANGE.S)}
                                                    max={hi(RANGE.S)}
                                                    range={true}
                                                    allowCross={true}
                                                    defaultValue={[
                                                        (this.state.saturationLow || 0),
                                                        (this.state.saturationHigh || 5)]} />

                                                <label htmlFor="value">VALUE</label>
                                                <Slider
                                                    min={lo(RANGE.V)}
                                                    max={hi(RANGE.V)}
                                                    range={true} allowCross={true}
                                                    defaultValue={[(this.state.valueLow || 1),
                                                    (this.state.valueHigh || 5)]} />
                                            </div>
                                            <div className="col-md-6 col-sm-12">
                                                <ChromePicker
                                                    color="#fff" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <h4>
                                                    <i>Processing Parameters</i>
                                                </h4>
                                            </div>

                                            <div className="col-md-4 col-sm-4">
                                                <label>BLUR</label>
                                                <input type="number"
                                                    min={lo(RANGE.blur)}
                                                    max={hi(RANGE.blur)}
                                                    onChange={this.temporary("blur")}
                                                    value={this.state.blur} />
                                            </div>

                                            <div className="col-md-4 col-sm-4">
                                                <label>MORPH</label>
                                                <input type="number"
                                                    min={lo(RANGE.morph)}
                                                    max={hi(RANGE.morph)}
                                                    onChange={this.temporary("morph")}
                                                    value={this.state.morph} />
                                            </div>

                                            <div className="col-md-4 col-sm-4">
                                                <label>ITERATION {this.state.iterations}</label>
                                                <input type="number"
                                                    min={lo(RANGE.iterations)}
                                                    max={hi(RANGE.iterations)}
                                                    onChange={this.temporary("iterations")}
                                                    value={this.state.iterations} />
                                            </div>
                                        </div>
                                        <ImageFlipper images={this.props.sync.images} />
                                        <div className="weed-detector-meta">
                                            <div className="time">
                                                <label>Time:</label>
                                                <span>{this.state.time}</span>
                                            </div>
                                            <div className="location">
                                                <label>Location:</label>
                                                <span>{this.state.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!isEditing && (
                                    <div className="widget-content">
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12">
                                                <img className="temp-plant" src="/plant.jpg" />
                                                <div className="weed-detector-meta">
                                                    <div className="time">
                                                        <label>Time:</label>
                                                        <span>{this.state.time}</span>
                                                    </div>
                                                    <div className="location">
                                                        <label>Location:</label>
                                                        <span>{this.state.location}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
