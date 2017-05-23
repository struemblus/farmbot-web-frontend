import * as React from "react";
import { Component } from "react";
import { changeStepSize, moveAbs, changeDevice } from "../devices/actions";
import { connect } from "react-redux";
import { t } from "i18next";
import { Peripherals } from "./peripherals";
import { EStopButton } from "../devices/components/e_stop_btn";
import { JogButtons } from "./jog_buttons";
import { AxisInputBoxGroup } from "./axis_input_box_group";
import { Row, Page, Col, Widget, WidgetBody, WidgetHeader } from "../ui";
import { mapStateToProps, Props } from "./state_to_props";
import { StepSizeSelector } from "./step_size_selector";
import { MustBeOnline } from "../devices/must_be_online";
import { ToolTips } from "../constants";
import { WebcamPanel } from "./webcam_panel";

@connect(mapStateToProps)
export class Controls extends Component<Props, {}> {

  render() {
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
          <WebcamPanel {...this.props} />
        </Col>
      </Row>
    </Page>;
  }
};
