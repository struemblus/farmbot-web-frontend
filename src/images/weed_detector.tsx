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
                <WeedDetectorBody images={this.props.images.all}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
