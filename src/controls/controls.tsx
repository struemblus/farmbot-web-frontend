import * as React from "react";
import { Component } from "react";
import { changeStepSize, moveAbs, changeDevice } from "../devices/actions";
import { connect } from "react-redux";
import { ControlsState } from "./interfaces";
import { t } from "i18next";
import { Peripherals } from "./peripherals";
import { EStopButton } from "../devices/components/e_stop_btn";
import { JogButtons } from "./jog_buttons";
import { AxisInputBoxGroup } from "./axis_input_box_group";
import { PLACEHOLDER_FARMBOT } from "../images/index";
import { Row, Page, Col, Widget, WidgetBody, WidgetHeader } from "../ui";
import { mapStateToProps, Props } from "./state_to_props";
import { StepSizeSelector } from "./step_size_selector";
import { showUrl } from "./show_url";
import { MustBeOnline } from "../devices/must_be_online";
import { ToolTips } from "../constants";

@connect(mapStateToProps)
export class Controls extends Component<Props, Partial<ControlsState>> {
  constructor() {
    super();
    this.state = { isEditingCameraURL: false, url: "http://" };
  }

  toggleCameraURLEdit = () => {
    this.setState({ isEditingCameraURL: !this.state.isEditingCameraURL });
  }

  clearURL = () => {
    this.props.dispatch(changeDevice(this.props.account, { webcam_url: "http://" }));
    this.setState({ url: "http://" });
    (document.querySelector(".webcam-url-input") as HTMLInputElement).focus();
  }

  saveURL = () => {
    let update = { webcam_url: this.state.url };
    this.props.dispatch(changeDevice(this.props.account, update));
    this.setState({ isEditingCameraURL: false });
  }

  render() {
    let fallback = PLACEHOLDER_FARMBOT;
    let custom = (this.props.account.body.webcam_url);
    let url = custom || fallback;
    let dirty = !!this.props.bot.dirty;
    let { isEditingCameraURL } = this.state;
    let { sync_status } = this.props.bot.hardware.informational_settings;

    return <Page className="controls">
      <Row>
        <Col xs={12} sm={6} md={4} mdOffset={1}>
          <Widget>
            <WidgetHeader title="Move" helpText={ToolTips.MOVE}>
              <EStopButton
                bot={this.props.bot}
                auth={this.props.auth} />
            </WidgetHeader>
            <WidgetBody>
              <MustBeOnline fallback="Bot is offline."
                lockOpen={process.env.NODE_ENV !== "production"}
                status={sync_status}>
                <label className="text-center">
                  {t("MOVE AMOUNT (mm)")}
                </label>
                <StepSizeSelector
                  choices={[1, 10, 100, 1000, 10000]}
                  selector={(num: number) => this.props.dispatch(changeStepSize(num))}
                  selected={this.props.bot.stepSize} />
                <JogButtons bot={this.props.bot} />
                <AxisInputBoxGroup
                  bot={this.props.bot}
                  onCommit={(input) => { moveAbs(input); }} />
              </MustBeOnline>
            </WidgetBody>
          </Widget>
          <Peripherals
            bot={this.props.bot}
            peripherals={this.props.peripherals}
            dispatch={this.props.dispatch}
            resources={this.props.resources} />
        </Col>
        <Col xs={12} sm={6}>
          <Widget>
            <WidgetHeader title="Camera" helpText={ToolTips.WEBCAM_SAVE}>
              {isEditingCameraURL ?
                <button className="green" onClick={this.saveURL}>
                  {t("Save")}
                </button>
                :
                <button className="gray" onClick={this.toggleCameraURLEdit}>
                  {t("Edit")}
                </button>
              }
            </WidgetHeader>
            {isEditingCameraURL && (
              <div>
                <label>{t("Set Webcam URL:")}</label>
                <button
                  className="clear-webcam-url-btn"
                  onClick={this.clearURL}>
                  <i className="fa fa-times"></i>
                </button>
                <input type="text"
                  onChange={e => this.setState({ url: e.currentTarget.value })}
                  value={this.state.url}
                  className="webcam-url-input" />
              </div>
            )}
            {showUrl(url, dirty)}
          </Widget>
        </Col>
      </Row>
    </Page>;
  }
};
