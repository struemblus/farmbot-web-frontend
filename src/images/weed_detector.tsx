import * as React from "react";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { t } from "i18next";
import { FarmbotPicker } from "./farmbot_picker";
import { DetectorState } from "./interfaces";
import { ImageFlipper } from ".";
import { devices } from "../device";
import { HsvSlider } from "./hsv_slider";
import { BlurableInput } from "../ui/blurable_input";
import { Pair } from "farmbot";
import { success, error, FBSelect, Col, Row, DropDownItem } from "../ui";
import { resetWeedDetection } from "./actions";
import { weedDetectorENVsafeFetch } from "./weed_detector_env";
import { Progress } from "../util";
import { additionalSettingsMenu } from "./weed_detector_config";

const DETECTOR_ENV = "PLANT_DETECTION_options";
const LAST_CLIENT_CONNECTED = "LAST_CLIENT_CONNECTED";

@connect((state: Everything) => state)
export class WeedDetector extends React.Component<Everything, Partial<DetectorState>> {
  constructor() {
    super();
    this.state = {
      isEditing: true,
      blur: 15,
      morph: 6,
      iterations: 4,
      deletionProgress: "",
      settingsMenuOpen: false
    };
  }

  get env() {
    return weedDetectorENVsafeFetch(this
      .props
      .bot
      .hardware
      .user_env[DETECTOR_ENV]);
  }

  componentDidMount() {
    const IS_ONLINE = !!this
      .props
      .bot
      .hardware
      .user_env[LAST_CLIENT_CONNECTED];
    const NEEDS_SETUP = !!this
      .props
      .bot
      .hardware
      .user_env[DETECTOR_ENV];
    if (IS_ONLINE && NEEDS_SETUP) {
      // Boot strap newly setup bots.
      this.sendOffConfig();
    }
    this.setState(this.env);
  }

  resetWeedDetection = () => {
    this.props.dispatch(resetWeedDetection(this.progress));
    this.setState({ deletionProgress: "Deleting..." });
  }

  progress = (p: Readonly<Progress>) => {
    let prg = p.isDone ? "" : `${Math.round((p.completed / p.total) * 100)} %`;
    this.setState({ deletionProgress: prg });
  }

  sendOffConfig = () => {
    let message = { [DETECTOR_ENV]: JSON.stringify(this.state) };
    devices
      .current
      .setUserEnv(message)
      .then(() => {
        console.log("Set user ENV: " + JSON.stringify(message));
      })
      .catch(() => { console.log("Tried to set user env") });
  }

  takePhoto = () => {
    devices
      .current
      .takePhoto()
      .then(function () {
        success("Request sent. The image will be available after post processing.");
      },
      function () {
        error("Unable to snap a photo. Is FarmBot online?");
      });
  }

  onBlur(key: keyof DetectorState) {
    return (e: React.FormEvent<HTMLInputElement>) => {
      let str = e.currentTarget.value;
      let num = parseInt(str, 10);
      if (!_.isNaN(num)) {
        if (key === "blur" && ((num % 2) === 0)) {
          alert("Blur must be an odd number.");
        } else {
          return this.setState({ [key]: num });
        }
      }
    };
  }

  setHSV = (key: "H" | "S" | "V", val: [number, number]) => {
    this.setState({ [key]: val });
  }

  test = () => {
    var that = this;
    let pairs = Object
      .keys(this.state)
      .map<Pair>(function (value: keyof DetectorState, index) {
        return {
          kind: "pair",
          args: { value, label: JSON.stringify(that.state[value]) || "null" }
        };
      });

    devices
      .current
      .execScript("plant-detection", pairs);
  }

  toggleSettingsMenu = () => {
    this.setState({ settingsMenuOpen: !this.state.settingsMenuOpen });
  }

  render() {
    let H = (this.state.H || [0, 0]);
    let S = (this.state.S || [0, 0]);
    let V = (this.state.V || [0, 0]);
    return <div>
      <div className="widget-wrapper weed-detector-widget">
        <div className="row">
          <div className="col-sm-12">
            <div className="widget-header">
              <button onClick={this.sendOffConfig}
                className="green button-like">
                {t("SAVE")}
              </button>
              <button
                onClick={this.test}
                className="yellow button-like">
                {t("TEST")}
              </button>
              <button
                className="gray button-like"
                onClick={this.takePhoto}>
                {t("Take Photo")}
              </button>
              <button onClick={this.resetWeedDetection}
                className="red button-like">
                {this.state.deletionProgress || t("CLEAR WEEDS")}
              </button>
              {/* TODO: Hook up calibration */}
              <button onClick={() => { }}
                className="green button-like">
                {t("Calibrate")}
              </button>
              <i className="fa fa-cog" onClick={this.toggleSettingsMenu}>
                {this.state.settingsMenuOpen && additionalSettingsMenu()}
              </i>
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
                      <HsvSlider name={"H"}
                        onChange={this.setHSV}
                        env={this.env} />
                      <label htmlFor="saturation">SATURATION</label>
                      <HsvSlider name={"S"}
                        onChange={this.setHSV}
                        env={this.env} />
                      <label htmlFor="value">VALUE</label>
                      <HsvSlider name={"V"}
                        onChange={this.setHSV}
                        env={this.env} />
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <FarmbotPicker h={H} s={S} v={V}
                        hsv={{ h: ((H[1] * 2 + H[0] * 2) / 2), s: 0, v: 0 }}
                        hsl={{ h: ((H[1] * 2 + H[0] * 2) / 2), s: 0, l: 0 }} />
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
                      <BlurableInput type="number"
                        min={0}
                        max={100}
                        onCommit={this.onBlur("blur")}
                        value={(this.state.blur || 0).toString()} />
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <label>MORPH</label>
                      <BlurableInput type="number"
                        min={0}
                        max={100}
                        onCommit={this.onBlur("morph")}
                        value={(this.state.morph || 0).toString()} />
                    </div>

                    <div className="col-md-4 col-sm-4">
                      <label>ITERATION</label>
                      <BlurableInput type="number"
                        min={0}
                        max={100}
                        onCommit={this.onBlur("iterations")}
                        value={(this.state.iterations || 0).toString()} />
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
