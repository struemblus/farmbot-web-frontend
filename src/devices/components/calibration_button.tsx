import * as React from "react";
import { t } from "i18next";
import { devices } from "../../device";
import { Axis, Xyz } from "../interfaces";
import { McuParams } from "farmbot/dist";
import { LockableButton } from "./lockable_button";
import { axisTrackingStatus } from "./axis_tracking_status";

function calibrate(axis: Axis) {
  devices
    .current
    .calibrate({ axis });
}

export function CalibrationRow({ hardware }: { hardware: McuParams }) {
  return <tr>
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
