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


interface CalibrationRowProps {
  hardware: McuParams;
}

export function CalibrationRow(input: CalibrationRowProps) {
  return <tr>
    <td>
      <label>{t("CALIBRATION")}</label>
    </td>
    {axisTrackingStatus(input)
      .map((r) => {
        console.log(`Calibration: ${r[0]}:${r[1]}`);
        return r;
      })
      .map((row) => {
        let [axis, disable] = row;
        return <td key={axis}>
          <LockableButton disabled={disable} onClick={() => calibrate(axis)}>
            {t("CALIBRATE {{axis}}", { axis })}
          </LockableButton>
        </td>
      })}
  </tr>;
}
