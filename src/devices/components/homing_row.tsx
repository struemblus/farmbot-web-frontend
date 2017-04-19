import * as React from "react";
import { t } from "i18next";
import { devices } from "../../device";
import { CalibrationButtonProps, Axis, Xyz } from "../interfaces";
import { Farmbot, McuParams } from "farmbot/dist";
import { LockableButton } from "./lockable_button";
import { axisTrackingStatus } from "./axis_tracking_status";

const speed = Farmbot.defaults.speed;
let home = (axis: Axis) => devices.current.home({ speed, axis });

export function HomingButton({ axis }: CalibrationButtonProps) {
  return <button className="yellow" onClick={() => home(axis)}>
    {t("HOME {{axis}}", { axis })}
  </button>;
};

interface HomingRowProps {
  hardware: McuParams;
}

export function HomingRow({ hardware }: HomingRowProps) {
  return <tr>
    <td>
      <label>{t("HOMING")}</label>
    </td>
    {axisTrackingStatus(hardware).map((row) => {
      let [axis, disable] = row;
      return <td key={axis}>
        <LockableButton disabled={disable} onClick={() => home(axis)}>
          {t("HOME {{axis}}", { axis })}
        </LockableButton>
      </td>
    })}
  </tr>;
}
