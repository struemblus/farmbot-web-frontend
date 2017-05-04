import * as React from "react";
import { t } from "i18next";
import { devices } from "../../device";
import { Axis } from "../interfaces";
import { McuParams } from "farmbot/dist";
import { LockableButton } from "./lockable_button";
import { axisTrackingStatus } from "./axis_tracking_status";

function calibrate(axis: Axis) {
  devices
    .current
    .calibrate({ axis });
}

interface CalibrationRowProps {
  hidden?: boolean | undefined;
  hardware: McuParams;
}

export function CalibrationRow(props: CalibrationRowProps) {
  let { hardware, hidden } = props;

  return <tr hidden={!!hidden}>
    <td>
      <label>{t("CALIBRATION")}</label>
      <div className="help">
        <i className="fa fa-question-circle help-icon" />
        <div className="help-text">
          {t(`(Alpha) If encoders or end-stops are enabled,
            home axis and determine maximum.`)}
        </div>
      </div>
    </td>
    {axisTrackingStatus(hardware)
      .map((row) => {
        let { axis, disabled } = row;
        return <td key={axis}>
          <LockableButton disabled={disabled} onClick={() => calibrate(axis)}>
            {t("CALIBRATE {{axis}}", { axis })}
          </LockableButton>
        </td>
      })}
  </tr>;
}
