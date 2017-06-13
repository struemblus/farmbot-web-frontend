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

export class HardwareSettings extends
  React.Component<HardwareSettingsProps, {}> {

  render() {
    let { bot, dispatch } = this.props;
    let controlPanelState = this.props.controlPanelState;
    let {
      homing_and_calibration,
      motors,
      encoders_and_endstops,
      danger_zone
    } = controlPanelState;
    // let iconString = hidePanel ? "plus" : "minus";

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
        <MustBeOnline
          fallback="Device is offline."
          status={bot.hardware.informational_settings.sync_status}
          lockOpen={process.env.NODE_ENV !== "production"}>
          <SpacePanelHeader>
            {t("Advanced")}
          </SpacePanelHeader>
          <HomingAndCalibration
            hidePanel={homing_and_calibration}
            dispatch={dispatch}
            bot={bot}
          />
          <Motors
            hidePanel={motors}
            dispatch={dispatch}
            bot={bot}
          />
          <Encoders
            hidePanel={encoders_and_endstops}
            dispatch={dispatch}
            bot={bot}
          />
          <EndStops
            hidePanel={encoders_and_endstops}
            dispatch={dispatch}
            bot={bot}
          />
          <DangerZone
            hidePanel={danger_zone}
            onReset={MCUFactoryReset}
          />
        </MustBeOnline>
      </WidgetBody>
    </Widget>;
  }
}
