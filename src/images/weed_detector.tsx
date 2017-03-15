import * as React from "react";
import { connect } from "react-redux";
import { Everything } from "../interfaces";
import { DetectorState } from "./interfaces";
import { WeedDetectorBody } from "./weed_detector_body";
import { TitleBar } from "./weed_detector_title";

@connect((state: Everything) => state)
export class WeedDetector extends React.Component<Everything, Partial<DetectorState>> {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let TODO_OPEN = false;
    return <div>
      <div className="widget-wrapper weed-detector-widget">
        <div className="row">
          <div className="col-sm-12">
            <TitleBar onDeletionClick={() => { console.log("NOT FINISHED") }}
              onPhotoClick={() => { console.log("NOT FINISHED") }}
              onSave={() => { console.log("NOT FINISHED") }}
              onSettingToggle={() => { console.log("NOT FINISHED") }}
              onTest={() => { console.log("NOT FINISHED") }}
              settingsMenuOpen={TODO_OPEN} />
            <div className="row">
              <div className="col-sm-12">
                <WeedDetectorBody images={this.props.sync.images}
                  onSliderChange={() => {
                  }}
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
