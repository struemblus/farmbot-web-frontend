import * as React from "react";
import { t } from "i18next";
import { MCUFactoryReset, toggleControlPanel } from "../actions";
import { Widget, WidgetHeader, WidgetBody } from "../../ui/index";
import { HardwareSettingsProps } from "../interfaces";
import { MustBeOnline } from "../must_be_online";
import { SaveBtn } from "../../ui/save_button";
import { ToolTips } from "../../constants";
import { DangerZone } from "./hardware_settings/danger_zone";
import { EndStops } from "./hardware_settings/end_stops";
import { Encoders } from "./hardware_settings/encoders";
import { Motors } from "./hardware_settings/motors";
import { HomingAndCalibration } from "./hardware_settings/homing_and_calibration";
import { SpacePanelHeader } from "./hardware_settings/space_panel_header";

export class HardwareSettings
  extends React.Component<HardwareSettingsProps, {}> {

  render() {
    let { bot, dispatch } = this.props;
    let hidePanel = this.props.controlPanelClosed;
    let iconString = hidePanel ? "plus" : "minus";

    return <Widget className="hardware-widget">
      <WidgetHeader title="Hardware" helpText={ToolTips.HW_SETTINGS}>
        <MustBeOnline
          status={bot.hardware.informational_settings.sync_status}
          lockOpen={process.env.NODE_ENV !== "production"}>
          <SaveBtn
            isDirty={false}
            isSaving={bot.isUpdating}
            isSaved={!bot.isUpdating}
            dirtyText={" "}
            savingText={"Updating..."}
            savedText={"saved"}
            hidden={false}
          />
        </MustBeOnline>
      </WidgetHeader>
      <WidgetBody>
        <MustBeOnline fallback="Device is offline."
          status={bot.hardware.informational_settings.sync_status}
          lockOpen={process.env.NODE_ENV !== "production"}>
          <SpacePanelHeader onClick={() => dispatch(toggleControlPanel())}>
            {t("Advanced")}
          </SpacePanelHeader>
          <HomingAndCalibration hidePanel={hidePanel}
            dispatch={this.props.dispatch}
            bot={bot} />
          <Motors hidePanel={hidePanel}
            dispatch={this.props.dispatch}
            bot={bot} />
          <Encoders hidePanel={hidePanel}
            dispatch={this.props.dispatch}
            bot={bot} />
          <EndStops hidePanel={hidePanel}
            dispatch={this.props.dispatch}
            bot={bot} />
          <DangerZone hidePanel={hidePanel} onReset={MCUFactoryReset} />
        </MustBeOnline>
      </WidgetBody>
    </Widget>;
  }
}
