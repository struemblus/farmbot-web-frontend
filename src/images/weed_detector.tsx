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
import { TitleBar } from "./weed_detector_title";

const DETECTOR_ENV = "PLANT_DETECTION_options";
const LAST_CLIENT_CONNECTED = "LAST_CLIENT_CONNECTED";

@connect((state: Everything) => state)
export class WeedDetector extends React.Component<Everything, Partial<DetectorState>> {
  constructor() {
    super();
    this.state = {};
  }

  TODO = (...x: any[]): any => {
    return "TODO!";
  }

  render() {
    return <div>
      <div className="widget-wrapper weed-detector-widget">
        <div className="row">
          <div className="col-sm-12">
            <TitleBar onDeletionClick={this.TODO()}
              onPhotoClick={this.TODO()}
              onSave={this.TODO()}
              onSettingToggle={this.TODO()}
              onTest={this.TODO()}
              deletionProgress={this.TODO()}
              settingsMenuOpen={this.TODO()} />
            <div className="row">
              <div className="col-sm-12">
                <WeedDetectorBody />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
