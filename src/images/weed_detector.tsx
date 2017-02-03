import * as React from "react";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { t } from "i18next";
import { ChromePicker } from "react-color";
import { DetectorState } from "./interfaces";
import { ImageFlipper } from ".";
import { devices } from "../device";
import { HsvSlider } from "./hsv_slider";

@connect((state: Everything) => state)
export class WeedDetector extends React.Component<Everything, Partial<DetectorState>> {
    constructor() {
        super();
        this.state = {
            isEditing: true,
            blur: 1,
            morph: 2,
            iterations: 3,
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
            console.log("!!!");
            if (!_.isNaN(num)) {
                return this.setState({ [key]: num });
            }
        };
    }

    render() {
        return <div>
            <div className="widget-wrapper weed-detector-widget">
                <div className="row">
                    <div className="col-sm-12">
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
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="widget-content">
                                    <div className="row">
                                        <div className="col-md-6 col-sm-12">
                                            <h4>
                                                <i>Color Range</i>
                                            </h4>

                                            <label htmlFor="hue">HUE</label>
                                            <HsvSlider name={"H"} />
                                            <label htmlFor="saturation">SATURATION</label>
                                            <HsvSlider name={"S"} />
                                            <label htmlFor="value">VALUE</label>
                                            <HsvSlider name={"V"} />
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
                                                min={(0)}
                                                max={(0)}
                                                onChange={this.temporary("blur")}
                                                value={this.state.blur} />
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <label>MORPH</label>
                                            <input type="number"
                                                min={(0)}
                                                max={(0)}
                                                onChange={this.temporary("morph")}
                                                value={this.state.morph} />
                                        </div>

                                        <div className="col-md-4 col-sm-4">
                                            <label>ITERATION {this.state.iterations}</label>
                                            <input type="number"
                                                min={(0)}
                                                max={(0)}
                                                onChange={this.temporary("iterations")}
                                                value={this.state.iterations} />
                                        </div>
                                    </div>
                                    <ImageFlipper images={this.props.sync.images} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
