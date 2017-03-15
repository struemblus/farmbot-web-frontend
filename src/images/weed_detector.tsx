import * as React from "react";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { DetectorState } from "./interfaces";
import { WeedDetectorBody } from "./weed_detector_body";
import { TitleBar } from "./weed_detector_title";
import { devices } from "../device";
import { success } from "../ui/index";
import { t } from "i18next";

@connect((state: Everything) => state)
export class WeedDetector extends React.Component<Everything, Partial<DetectorState>> {
  constructor() {
    super();
    this.state = {};
  }

  takePhoto = () => {
    // TODO: Real handler / toast.
    devices
      .current
      .takePhoto()
      .then(() => success(t("Processing photo.")), () => { alert("Error taking photo"); });
  }

  render() {
    let TODO_OPEN = false;
    return <div>
      <div className="widget-wrapper weed-detector-widget">
        <div className="row">
          <div className="col-sm-12">
            <TitleBar onDeletionClick={() => { console.log("NOT FINISHED"); }}
              onPhotoClick={this.takePhoto}
              onSave={() => { console.log("NOT FINISHED"); }}
              onSettingToggle={() => { console.log("NOT FINISHED"); }}
              onTest={() => { console.log("NOT FINISHED"); }}
              settingsMenuOpen={TODO_OPEN} />
            <div className="row">
              <div className="col-sm-12">
                <WeedDetectorBody images={this.props.sync.images}
                  onSliderChange={() => { }}
                  H={3}
                  S={3}
                  V={3} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
