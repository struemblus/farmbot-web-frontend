import * as React from "react";
import { Widget, Row, Col } from "../ui/index";
import { CameraCalibrationState, CameraCalibrationProps } from "./interfaces";
import { TitleBar } from "../images/weed_detector_title";
import { WeedDetectorBody } from "../images/weed_detector_body";

export class CameraCalibration
  extends React.Component<CameraCalibrationProps, CameraCalibrationState> {
  constructor() {
    super();
    this.state = { settingsMenuOpen: false };
  }

  toggleSettingsMenu = () => {
    this.setState({ settingsMenuOpen: !this.state.settingsMenuOpen });
  }

  sliderChange = () => {

  }

  calibrate = () => {

  }

  STUBS = {
    H: [0],
    S: [0],
    V: [0]
  }

  render() {
    return <Widget className="weed-detector-widget coming-soon">
      <Row>
        <Col>
          <TitleBar
            title={"Camera Calibration"}
            settingsMenuOpen={!!this.state.settingsMenuOpen}
            onSettingToggle={this.toggleSettingsMenu}
            onCalibrate={this.calibrate}
          />
          <Row>
            <Col sm={12}>
              <WeedDetectorBody
                images={this.props.images}
                onSliderChange={this.sliderChange}
                H={this.STUBS.H}
                S={this.STUBS.S}
                V={this.STUBS.V}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Widget>
  }
}
