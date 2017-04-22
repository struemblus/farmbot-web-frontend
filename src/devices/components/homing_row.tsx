import * as React from "react";
import { t } from "i18next";
import { devices } from "../../device";
import { CalibrationButtonProps, Axis, Xyz } from "../interfaces";
import { Farmbot, McuParams } from "farmbot/dist";
import { LockableButton } from "./lockable_button";
import { axisTrackingStatus } from "./axis_tracking_status";

const speed = Farmbot.defaults.speed;
let findHome = (axis: Axis) => devices.current.findHome({ speed, axis });

/*export function HomingButton({ axis }: CalibrationButtonProps) {
  return <button className="yellow" onClick={() => findHome(axis)}>
    {t("HOME {{axis}}", { axis })}
  </button>;
};*/

interface HomingRowProps {
  hardware: McuParams;
}

export function HomingRow({ hardware }: { hardware: McuParams }) {
  return <tr>
    <td>
      <label>{t("HOMING")}</label>
      <div className="help">
        <i className="fa fa-question-circle help-icon" />
        <div className="help-text">
          {t(`(Alpha) If encoders or end-stops are enabled,
            home axis (find zero).`)}
        </div>
      </div>
    </td>
    {axisTrackingStatus(hardware)
      .map((row) => {
        let { axis, disabled } = row;
        return <td key={axis}>
          <LockableButton disabled={disabled} onClick={() => findHome(axis)}>
            {t("HOME {{axis}}", { axis })}
          </LockableButton>
        </td>
      })}
  </tr>;
}
